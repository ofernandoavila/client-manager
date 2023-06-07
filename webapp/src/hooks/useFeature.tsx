import { useContext } from "react"
import { FeatureContext } from "../contexts/FeatureContext"

export function useFeature() {
    const context = useContext(FeatureContext);

    return context;
}