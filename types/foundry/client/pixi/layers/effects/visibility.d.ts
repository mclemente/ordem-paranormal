export {};

declare global {
    interface CanvasVisibilityTestConfig {
        /** The target object */
        object: PlaceableObject;
        /** An array of visibility tests */
        tests: CanvasVisibilityTest[];
    }

    interface CanvasVisibilityTest {
        point: Point;
        los: Map<VisionSource<Token>, boolean>;
    }
}
