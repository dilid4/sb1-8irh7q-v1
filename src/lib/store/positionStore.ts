import { create } from 'zustand';
import { Position } from '../types/trading';
import { PositionState } from '../types/position';

export const usePositionStore = create<PositionState>((set, get) => ({
  positions: {},
  
  addPosition: (position: Position) =>
    set((state) => ({
      positions: { ...state.positions, [position.id]: position }
    })),
  
  updatePosition: (id: string, update: Partial<Position>) =>
    set((state) => {
      const position = state.positions[id];
      if (!position) return state;
      
      return {
        positions: {
          ...state.positions,
          [id]: { ...position, ...update }
        }
      };
    }),
  
  removePosition: (id: string) =>
    set((state) => {
      const { [id]: removed, ...positions } = state.positions;
      return { positions };
    }),
  
  getPosition: (id: string) => get().positions[id],
  
  getAllPositions: () => Object.values(get().positions)
}));