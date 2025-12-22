
export type GestureType = 'peace' | 'one' | 'fist' | 'palm' | 'thumbs_up' | 'rock' | 'point_down' | 'okay' | 'none';

export interface GestureState {
  gesture: GestureType;
  expansion: number;
  color: string;
  shape: 'sphere' | 'heart' | 'flower' | 'saturn' | 'fireworks' | 'spiral' | 'star' | 'wave';
}

export interface ParticleConfig {
  count: number;
  size: number;
  baseColor: string;
}
