export interface PersonData {
  name: string;
  subtitle: string;
  sections: PersonSection[];
}

export interface PersonSection {
  title: string;
  items: string[];
  ordered?: boolean;
}

export interface PersonsProps {
  persons: PersonData[];
  className?: string;
  nextLabel?: string;
  restartLabel?: string;
  prevLabel?: string;
}
