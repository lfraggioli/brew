export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export const grindLabels: Record<string, string> = {
  'extra-fine': 'Extra fina',
  fine: 'Fina',
  'medium-fine': 'Media-fina',
  medium: 'Media',
  'medium-coarse': 'Media-gruesa',
  coarse: 'Gruesa',
};
