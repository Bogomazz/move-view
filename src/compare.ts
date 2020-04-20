import { Pose } from '@tensorflow-models/posenet';
import { Keypoint, getBoundingBox } from "@tensorflow-models/posenet";
const similarity = require('compute-cosine-similarity');

export function compare(pose1: Pose, pose2: Pose, minConfidence = 0.1) {
    const poseVector1 = getNormalizedVector(pose1.keypoints);
    const poseVector2 = getNormalizedVector(pose2.keypoints);

    // let vector1PoseXY = poseVector1.slice(0, 34);
    // let vector1Confidences = pose1.keypoints.map(k => k.score)
    // const vector1ConfidenceSum = vector1Confidences.reduce((sum, score) => sum + score, 0);
    // let vector2PoseXY = poseVector2.slice(0, 34);
    // let summation1 = 1 / vector1ConfidenceSum;
    // let summation2 = 0;
    // for (let i = 0; i < vector1PoseXY.length; i++) {
    //     let tempConf = Math.floor(i / 2);
    //     let tempSum =
    //         vector1Confidences[tempConf] * Math.abs(vector1PoseXY[i] - vector2PoseXY[i]);
    //     summation2 = summation2 + tempSum;
    // }
    // 
    // return summation1 * summation2;
    return cosineDistanceMatching(poseVector1, poseVector2)
}

function cosineDistanceMatching(poseVector1, poseVector2) {
    let cosineSimilarity = similarity(poseVector1, poseVector2);
    let distance = 2 * (1 - cosineSimilarity);
    return Math.sqrt(distance);
  }

export function getNormalizedVector(keypoints: Keypoint[]): number[] {
    const { minX, minY } = getBoundingBox(keypoints);
    return keypoints.map(k => {
        return [
            ...L2normalization(k.position.x - minX, k.position.y - minY),
            k.score
        ]
    }).reduce((vector: number[], [x, y]: number[]) => {
        return [...vector, x, y];
    }, [])
}

function L2normalization(x: number, y: number): [number, number] {
    const length = Math.sqrt(x * x + y * y);
    return [x / length, y / length];
}
