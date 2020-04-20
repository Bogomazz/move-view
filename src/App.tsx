import React, { useRef, useEffect, useState, DetailedHTMLProps, VideoHTMLAttributes } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import { compare } from './compare';
import { PoseState } from './models/pose-state';

import pose1Img from './content/pose 1.png';
import pose2Img from './content/pose 2.png'
import { Workout } from './components/workout';
import { PoseNet, Pose } from '@tensorflow-models/posenet';
import { PoseVideo } from './components/pose-video';

const poses: PoseState[] = [
  {
    img: pose1Img,
    order: 1,
    status: 'inprogress',
  },
  {
    img: pose2Img,
    order: 2,
    status: 'blocked',
  },
  {
    img: pose1Img,
    order: 3,
    status: 'blocked',
  },
  {
    img: pose2Img,
    order: 4,
    status: 'blocked',
  },
  {
    img: pose1Img,
    order: 5,
    status: 'blocked',
  },
  {
    img: pose2Img,
    order: 6,
    status: 'blocked',
  },
];

const videoWidth = 600;
const videoHeight = 500;
const DISTANCE_TRASHHOLD = 15;
// const PERIOD = 80;
const MIN_CONFIDENCE = 0.3;

function App() {

  const [workout, setWorkouts] = useState<PoseState[]>(poses);
  const [appLoaded, setAppLoaded] = useState<boolean>(false);
  const [distance, setDistance] = useState<number>(0);
  const [videoPose, setVideoPose] = useState<Pose | null>(null);
  const [lastPassedTime, setLastPAssedTime] = useState<Date>(new Date());


  const videoRef = useRef<HTMLVideoElement>(null);
  const posenetRef = useRef<PoseNet | null>(null)

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    
    const initAsync = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
          'Browser API navigator.mediaDevices.getUserMedia not available');
        }
        
        video.width = videoWidth;
        video.height = videoHeight;
        const stream = await navigator.mediaDevices.getUserMedia({
          'audio': false,
          'video': {
            facingMode: 'user',
            width: videoWidth,
            height: videoHeight,
          },
        });
        video.srcObject = stream;
        
        const net = await posenet.load();
        posenetRef.current = net;
        video.onloadeddata = () => {
          setAppLoaded(true)
        };
      }
      
      initAsync();
     
  }, []);

  useEffect(() => {
    if (!appLoaded) {
      return;
    }
    const net = posenetRef.current;
    const video = videoRef.current;
    if (!net || !video) {
      return;
    }

    const run = async () => {

      const pose1 = await net.estimateSinglePose(video, {flipHorizontal: true});
      const img = new Image();
      const currentPose = workout.find(p => p.status === 'inprogress');
      if (!currentPose) {
        return;
      }
      img.src = currentPose.img;
      console.log(currentPose.img);
      const pose2 = await net.estimateSinglePose(img);
  
      const distance = Math.floor(compare(pose1, pose2, MIN_CONFIDENCE) * 100);
  
  
      if (distance < DISTANCE_TRASHHOLD && new Date().getTime() - lastPassedTime.getTime() > 1500) {
        console.log(new Date().getTime() - lastPassedTime.getTime());
        setWorkouts(workout => {
          const current = workout.find(p => p.status === 'inprogress');
          if (!current) {
            return workout;
          }
          const next = workout.find(p => p.order === current.order + 1);
          if (!next) {
            return workout.map(p => {p.status = 'done'; return p;});
          } else {
            const others = workout.filter(p => p.order !== current.order && p.order !== next.order);
            return [...others, {...current, status: 'done'}, {...next, status: 'inprogress'}];
          }
        });
        setLastPAssedTime(new Date());
      }
  
      setVideoPose(pose1);
      setDistance(distance);
    }
    // const interval = setInterval( async () => {
      
    // }, PERIOD);
    run();
  }, [videoPose, lastPassedTime, appLoaded, setWorkouts, setLastPAssedTime])

  return (
    <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div style={{width: '1000px'}}>
        <div style={{display: 'flex'}}>
          <div>
            <video style={{ transform: 'scaleX(-1)', display: 'none' }} ref={videoRef} autoPlay></video>
            {videoRef.current ?<PoseVideo pose={videoPose} video={videoRef.current}></PoseVideo> : null}
          </div>
          <div style={{marginLeft: '10px'}}>
            distance: {distance} <br />
            {/* fps: {1000/PERIOD} <br /> */}
            trashhold: {DISTANCE_TRASHHOLD}
          </div>
        </div>
        <Workout poses={workout} />
      </div>
    </div>
  );
}

export default App;
