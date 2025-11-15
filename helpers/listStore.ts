"use client";

import { useSyncExternalStore } from "react";
import type { ListDto } from "@/types/listTypes";
import { todoLists as seed } from "@/data/todoLists";

type State = { lists: ListDto[] };
type Listener = () => void;

let state: State = { lists: seed };
const listeners = new Set<Listener>();

function setState(updater: (prev: State) => State) {
  state = updater(state);
  listeners.forEach((l) => l());
}

function subscribe(l: Listener) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function getState(): State {
  return state;
}

export function toggleItemCompleted(listId: string, idx: number) {
  setState((prev) => ({
    lists: prev.lists.map((l) =>
      l.id === listId
        ? {
            ...l,
            items: l.items.map((it, j) =>
              j === idx ? { ...it, completed: !it.completed } : it,
            ),
          }
        : l,
    ),
  }));
}

export function removeItem(listId: string, idx: number) {
  setState((prev) => ({
    lists: prev.lists.map((l) =>
      l.id === listId
        ? { ...l, items: l.items.filter((_, j) => j !== idx) }
        : l,
    ),
  }));
}

export function addMember(listId: string, email: string) {
  setState((prev) => ({
    lists: prev.lists.map((l) =>
      l.id === listId && !l.members.includes(email)
        ? { ...l, members: [...l.members, email] }
        : l,
    ),
  }));
}

export function removeMember(listId: string, email: string) {
  setState((prev) => ({
    lists: prev.lists.map((l) =>
      l.id === listId
        ? { ...l, members: l.members.filter((m) => m !== email) }
        : l,
    ),
  }));
}

export function removeList(listId: string) {
  setState((prev) => ({
    lists: prev.lists.filter((l) => l.id !== listId),
  }));
}

export function addList(list: ListDto) {
  setState((prev) => ({
    lists: [...prev.lists, list],
  }));
}

export function useList(id?: string) {
  return useSyncExternalStore(
    subscribe,
    () => state.lists.find((l) => l.id === id) ?? null,
  );
}

export function useLists() {
  return useSyncExternalStore(
    subscribe,
    () => state.lists,
    () => state.lists,
  );
}
