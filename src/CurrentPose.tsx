import React from 'react';
import { PoseState } from "./models/pose-state";
import { PoseNet } from "@tensorflow-models/posenet";
import { useRef, memo } from 'react';
import { useEffect } from 'react';
import { drawKeypoints, drawSkeleton, drawBoundingBox } from './components/pose-video';


type CPProps = {pose: PoseState, net: PoseNet};
export const CurrentPose = memo(function CurrentPose({pose, net}: CPProps): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>();

  useEffect(() => {

    console.log(pose)

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) {
      return;
    }

    const image = new Image();
    image.src = pose.img;

    ctx.clearRect(0, 0, image.width, image.height);
    ctx.save();
    ctx.drawImage(image, 0, 0, image.width, image.height);
    ctx.restore();

    const minPartConfidence = 0.3;

    if(!pose) {
      console.log('!pose');
      return;
    }

    net.estimateSinglePose(image).then(pose => {
      drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      drawBoundingBox(pose.keypoints, ctx);
    })
  })
  return <canvas ref={canvasRef} width={1000} height={1000}></canvas>
})