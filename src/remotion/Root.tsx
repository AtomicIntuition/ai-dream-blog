import { Composition } from 'remotion';
import { DreamJourneyExplainer, dreamJourneyConfig } from './compositions/DreamJourneyExplainer';

/**
 * Remotion entry point
 *
 * To run Remotion Studio:
 * npx remotion studio src/remotion/Root.tsx
 *
 * To render a video:
 * npx remotion render src/remotion/Root.tsx DreamJourneyExplainer out/video.mp4
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main explainer video - 1080p landscape */}
      <Composition
        id={dreamJourneyConfig.id}
        component={DreamJourneyExplainer}
        durationInFrames={dreamJourneyConfig.durationInFrames}
        fps={dreamJourneyConfig.fps}
        width={dreamJourneyConfig.width}
        height={dreamJourneyConfig.height}
      />

      {/* Instagram Reels / TikTok - 9:16 vertical */}
      <Composition
        id="DreamJourneyVertical"
        component={DreamJourneyExplainer}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Twitter/X - 16:9 shorter version */}
      <Composition
        id="DreamJourneyTwitter"
        component={DreamJourneyExplainer}
        durationInFrames={300} // 10 seconds
        fps={30}
        width={1280}
        height={720}
      />

      {/* Square for social cards */}
      <Composition
        id="DreamJourneySquare"
        component={DreamJourneyExplainer}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};
