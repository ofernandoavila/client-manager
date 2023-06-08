import { PreferenceContext } from "../contexts/PreferenceContext";

export function usePreference() {
    const context = PreferenceContext;

    return context;
}