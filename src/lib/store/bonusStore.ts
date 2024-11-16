import { create } from 'zustand';
import { BonusRule, UserBonus } from '../types/bonus';

interface BonusState {
  rules: BonusRule[];
  userBonuses: UserBonus[];
  setRules: (rules: BonusRule[]) => void;
  addRule: (rule: BonusRule) => void;
  updateRule: (id: string, update: Partial<BonusRule>) => void;
  removeRule: (id: string) => void;
  setUserBonuses: (bonuses: UserBonus[]) => void;
  addUserBonus: (bonus: UserBonus) => void;
  updateUserBonus: (id: string, update: Partial<UserBonus>) => void;
}

export const useBonusStore = create<BonusState>((set) => ({
  rules: [],
  userBonuses: [],
  
  setRules: (rules) => set({ rules }),
  
  addRule: (rule) =>
    set((state) => ({
      rules: [...state.rules, rule]
    })),
  
  updateRule: (id, update) =>
    set((state) => ({
      rules: state.rules.map((rule) =>
        rule.id === id ? { ...rule, ...update } : rule
      )
    })),
  
  removeRule: (id) =>
    set((state) => ({
      rules: state.rules.filter((rule) => rule.id !== id)
    })),
  
  setUserBonuses: (userBonuses) => set({ userBonuses }),
  
  addUserBonus: (bonus) =>
    set((state) => ({
      userBonuses: [...state.userBonuses, bonus]
    })),
  
  updateUserBonus: (id, update) =>
    set((state) => ({
      userBonuses: state.userBonuses.map((bonus) =>
        bonus.id === id ? { ...bonus, ...update } : bonus
      )
    }))
}));