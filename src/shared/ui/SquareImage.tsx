import React, {useEffect, useState} from 'react';
import {Image, ImageProps} from 'react-native';

interface Props extends ImageProps {}

const SquareImage = ({...props}: Props) => {
  let ref: React.ElementRef<typeof Image> | null = null;
  const imageRef: React.LegacyRef<Image> = (element: Image) => (ref = element);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref) {
      ref.measure((x, y, width) => {
        setHeight(width);
      });
    }
  }, [ref]);
  return <Image {...props} ref={imageRef} style={[{height}, props.style]} />;
};

export default SquareImage;
