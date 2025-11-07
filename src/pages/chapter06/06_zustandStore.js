import { create } from 'zustand';

export const useStore = create(set => ({
  counter: {value: 0},
  counterActions: { 
    increment: () => set(state => ({ counter: { value: state.counter.value + 1 }})), 
    decrement: () => set(state => ({ counter: { value: state.counter.value - 1 }})),
    incrementByAmount: amount => set( state => ({ counter: { value: state.counter.value + amount }})),
  },
}));