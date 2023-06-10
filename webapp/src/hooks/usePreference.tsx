import { useContext } from "react";
import { PreferenceContext } from "../contexts/PreferenceContext";

export function usePreference() {
    const context = useContext(PreferenceContext);

    return context;
}