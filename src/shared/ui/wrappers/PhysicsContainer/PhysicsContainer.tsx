import {
  type FC,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  Children,
  isValidElement,
  useMemo,
  useCallback,
} from 'react';
import Matter from 'matter-js';
import cn from 'classnames';
import styles from './PhysicsContainer.module.scss';

interface PhysicsContainerProps {
  children: ReactNode;
  className?: string;
  cursorForce?: number;
  cursorRadius?: number;
  gap?: number;
  /** Порог скорости для засыпания (чем меньше, тем дольше симуляция) */
  sleepThreshold?: number;
  /** Время неактивности перед засыпанием (мс) */
  sleepDelay?: number;
}

interface BodyData {
  id: number;
  body: Matter.Body;
  width: number;
  height: number;
  element: ReactNode;
}

export const PhysicsContainer: FC<PhysicsContainerProps> = ({
  children,
  className,
  cursorForce = 0.0005,
  cursorRadius = 80,
  gap = 4,
  sleepThreshold = 0.1,
  sleepDelay = 500,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureContainerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<BodyData[]>([]);
  const wallsRef = useRef<Matter.Body[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isInside: false });
  const animationRef = useRef<number | null>(null);
  const cursorForceRef = useRef(cursorForce);
  const cursorRadiusRef = useRef(cursorRadius);

  // Состояние сна
  const isAwakeRef = useRef(true);
  const lastActivityRef = useRef(Date.now());
  const sleepThresholdRef = useRef(sleepThreshold);
  const sleepDelayRef = useRef(sleepDelay);

  const [positions, setPositions] = useState<Map<number, { x: number; y: number; angle: number }>>(new Map());
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [phase, setPhase] = useState<'measure' | 'physics'>('measure');

  useEffect(() => {
    cursorForceRef.current = cursorForce;
    cursorRadiusRef.current = cursorRadius;
    sleepThresholdRef.current = sleepThreshold;
    sleepDelayRef.current = sleepDelay;
  }, [cursorForce, cursorRadius, sleepThreshold, sleepDelay]);

  const childArray = useMemo(
    () => Children.toArray(children).filter(isValidElement),
    [children]
  );

  // Пробуждение симуляции
  const wakeUp = useCallback(() => {
    lastActivityRef.current = Date.now();

    if (!isAwakeRef.current) {
      isAwakeRef.current = true;

      // Перезапускаем анимацию
      if (!animationRef.current && engineRef.current) {
        const update = () => {
          const engine = engineRef.current;
          const bodies = bodiesRef.current;

          if (!engine || bodies.length === 0) {
            animationRef.current = requestAnimationFrame(update);
            return;
          }

          Matter.Engine.update(engine, 1000 / 60);

          // Сила от курсора
          if (mouseRef.current.isInside) {
            const cursorR = cursorRadiusRef.current;
            const cursorF = cursorForceRef.current;

            bodies.forEach(({ body }) => {
              const dx = body.position.x - mouseRef.current.x;
              const dy = body.position.y - mouseRef.current.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < cursorR && distance > 0) {
                const force = ((cursorR - distance) / cursorR) * cursorF;
                Matter.Body.applyForce(body, body.position, {
                  x: (dx / distance) * force,
                  y: (dy / distance) * force,
                });
                lastActivityRef.current = Date.now();
              }
            });
          }

          // Проверяем, нужно ли засыпать
          const allSleeping = bodies.every(({ body }) => {
            const speed = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2);
            const angularSpeed = Math.abs(body.angularVelocity);
            return speed < sleepThresholdRef.current && angularSpeed < sleepThresholdRef.current;
          });

          const timeSinceActivity = Date.now() - lastActivityRef.current;

          if (allSleeping && timeSinceActivity > sleepDelayRef.current && !mouseRef.current.isInside) {
            // Засыпаем
            isAwakeRef.current = false;
            animationRef.current = null;
            return;
          }

          // Обновляем позиции
          const newPositions = new Map<number, { x: number; y: number; angle: number }>();
          bodies.forEach(({ id, body }) => {
            newPositions.set(id, {
              x: body.position.x,
              y: body.position.y,
              angle: body.angle,
            });
          });
          setPositions(newPositions);

          animationRef.current = requestAnimationFrame(update);
        };

        animationRef.current = requestAnimationFrame(update);
      }
    }
  }, []);

  // Основной цикл обновления
  const update = useCallback(() => {
    const engine = engineRef.current;
    const bodies = bodiesRef.current;

    if (!engine || bodies.length === 0) {
      animationRef.current = requestAnimationFrame(update);
      return;
    }

    Matter.Engine.update(engine, 1000 / 60);

    // Сила от курсора
    if (mouseRef.current.isInside) {
      const cursorR = cursorRadiusRef.current;
      const cursorF = cursorForceRef.current;

      bodies.forEach(({ body }) => {
        const dx = body.position.x - mouseRef.current.x;
        const dy = body.position.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < cursorR && distance > 0) {
          const force = ((cursorR - distance) / cursorR) * cursorF;
          Matter.Body.applyForce(body, body.position, {
            x: (dx / distance) * force,
            y: (dy / distance) * force,
          });
          lastActivityRef.current = Date.now();
        }
      });
    }

    // Проверяем, нужно ли засыпать
    const allSleeping = bodies.every(({ body }) => {
      const speed = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2);
      const angularSpeed = Math.abs(body.angularVelocity);
      return speed < sleepThresholdRef.current && angularSpeed < sleepThresholdRef.current;
    });

    const timeSinceActivity = Date.now() - lastActivityRef.current;

    if (allSleeping && timeSinceActivity > sleepDelayRef.current && !mouseRef.current.isInside) {
      isAwakeRef.current = false;
      animationRef.current = null;
      return;
    }

    // Обновляем позиции
    const newPositions = new Map<number, { x: number; y: number; angle: number }>();
    bodies.forEach(({ id, body }) => {
      newPositions.set(id, {
        x: body.position.x,
        y: body.position.y,
        angle: body.angle,
      });
    });
    setPositions(newPositions);

    animationRef.current = requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setContainerSize({ width, height });
        wakeUp(); // Пробуждаем при ресайзе
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [wakeUp]);

  useEffect(() => {
    if (phase !== 'measure') return;
    if (containerSize.width === 0 || containerSize.height === 0) return;

    const timer = setTimeout(() => {
      if (!measureContainerRef.current) return;

      const measureElements = measureContainerRef.current.children;
      if (measureElements.length !== childArray.length) return;

      const sizes: { width: number; height: number }[] = [];
      for (let i = 0; i < measureElements.length; i++) {
        const rect = measureElements[i].getBoundingClientRect();
        sizes.push({
          width: Math.ceil(rect.width) || 100,
          height: Math.ceil(rect.height) || 40,
        });
      }

      const { width: containerWidth, height: containerHeight } = containerSize;

      const engine = Matter.Engine.create({
        gravity: { x: 0, y: 1, scale: 0.001 },
      });
      engineRef.current = engine;

      const wallThickness = 50;
      const walls = [
        Matter.Bodies.rectangle(
          containerWidth / 2,
          containerHeight + wallThickness / 2,
          containerWidth + wallThickness * 2,
          wallThickness,
          { isStatic: true, friction: 0.8, restitution: 0.2 }
        ),
        Matter.Bodies.rectangle(
          -wallThickness / 2,
          containerHeight / 2,
          wallThickness,
          containerHeight * 2,
          { isStatic: true }
        ),
        Matter.Bodies.rectangle(
          containerWidth + wallThickness / 2,
          containerHeight / 2,
          wallThickness,
          containerHeight * 2,
          { isStatic: true }
        ),
      ];

      wallsRef.current = walls;
      Matter.Composite.add(engine.world, walls);

      const bodies: BodyData[] = [];

      childArray.forEach((child, index) => {
        const { width, height } = sizes[index];
        const bodyWidth = width + gap;
        const bodyHeight = height + gap;

        const x = Math.random() * (containerWidth - bodyWidth - 20) + bodyWidth / 2 + 10;
        const y = -50 - index * 70;

        const body = Matter.Bodies.rectangle(x, y, bodyWidth, bodyHeight, {
          friction: 0.3,
          frictionAir: 0.02,
          restitution: 0.3,
          density: 0.001,
          chamfer: { radius: 8 },
        });

        bodies.push({ id: body.id, body, width, height, element: child });
        Matter.Composite.add(engine.world, body);
      });

      bodiesRef.current = bodies;
      lastActivityRef.current = Date.now();

      setPhase('physics');
      animationRef.current = requestAnimationFrame(update);
    }, 150);

    return () => clearTimeout(timer);
  }, [phase, containerSize, childArray, update, gap]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (phase !== 'physics') return;
    if (!engineRef.current || wallsRef.current.length === 0) return;

    const { width: containerWidth, height: containerHeight } = containerSize;
    if (containerWidth === 0 || containerHeight === 0) return;

    const wallThickness = 50;
    const [floor, , rightWall] = wallsRef.current;

    Matter.Body.setPosition(floor, {
      x: containerWidth / 2,
      y: containerHeight + wallThickness / 2,
    });

    Matter.Body.setPosition(rightWall, {
      x: containerWidth + wallThickness / 2,
      y: containerHeight / 2,
    });
  }, [phase, containerSize]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isInside: true,
    };
    wakeUp();
  };

  const handleMouseEnter = () => {
    mouseRef.current.isInside = true;
    wakeUp();
  };

  const handleMouseLeave = () => {
    mouseRef.current.isInside = false;
  };

  // Клик тоже пробуждает
  const handleClick = () => {
    wakeUp();

    // Добавляем небольшой импульс всем телам
    bodiesRef.current.forEach(({ body }) => {
      Matter.Body.applyForce(body, body.position, {
        x: (Math.random() - 0.5) * 0.001,
        y: -Math.random() * 0.002,
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn(styles.container, className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {phase === 'measure' && (
        <div ref={measureContainerRef} className={styles.measureContainer}>
          {childArray.map((child, index) => (
            <div key={index} className={styles.measureItem}>
              {child}
            </div>
          ))}
        </div>
      )}

      {phase === 'physics' &&
        bodiesRef.current.map(({ id, width, height, element }) => {
          const pos = positions.get(id);
          if (!pos) return null;

          return (
            <div
              key={id}
              className={styles.item}
              style={{
                width,
                height,
                transform: `translate(${pos.x - width / 2}px, ${pos.y - height / 2}px) rotate(${pos.angle}rad)`,
              }}
            >
              {element}
            </div>
          );
        })}
    </div>
  );
};
