"use client";

import { useSyncExternalStore } from "react";
import type { ListDto } from "@/types/listTypes";
import { getTodoLists } from "@/data/todoLists";

type State = { lists: ListDto[] };
type Listener = () => void;

let state: State = { lists: getTodoLists() };
const listeners = new Set<Listener>();

function setState(updater: (prev: State) => State) {
  state = updater(state);
  listeners.forEach((l) => l());
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

export function addList(list: ListDto) {
  setState((prev) => ({
    lists: [...prev.lists, list],
  }));
}
