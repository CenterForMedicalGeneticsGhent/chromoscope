export default function visibilityWindowSpec(upperLimit, lowerLimit){
    const upperLimitSpec = {
        "operation": "less-than",
        "measure": "zoomLevel",
        "threshold": upperLimit,
        "target": "track",
        "transitionPadding": 0,
    };
    const lowerLimitSpec = {
        "operation": "greater-than",
        "measure": "zoomLevel",
        "threshold": lowerLimit,
        "target": "track",
        "transitionPadding": 0,
    };
    return [upperLimitSpec, lowerLimitSpec];
}