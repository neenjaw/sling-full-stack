import React, { useEffect, useState } from "react";
import { useChannel } from "./useChannel";

type PartDisplay = {
  part: {
    name: string;
    id: number;
  };
};

export const PartDisplay: React.FC<PartDisplay> = ({ part }) => {
  const [screenshotChannel] = useChannel("screenshot");
  const LOAD_SCREENSHOT_MESSAGE = "load_screenshot";
  const [screenshot, setScreenshot] = useState<string | null>(null);

  // listening for messages from the channel
  useEffect(() => {
    if (!screenshotChannel) return;

    const screenshotSuscription = screenshotChannel.on(
      LOAD_SCREENSHOT_MESSAGE,
      (response) => {
        setScreenshot(response.data.screenshot.url);
      }
    );

    return () => {
      screenshotChannel.off(LOAD_SCREENSHOT_MESSAGE, screenshotSuscription);
    };
  }, [screenshotChannel]);

  // pushing messages to the channel
  useEffect(() => {
    if (!screenshotChannel) return;

    screenshotChannel.push(LOAD_SCREENSHOT_MESSAGE, { partId: part.id });
  }, []);

  return (
    <div>
      <h1>Part: {part.name}</h1>
      <div>
        {screenshot ? (
          <img src={screenshot} alt="screenshot" />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};
