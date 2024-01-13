import { useEffect, useState } from 'react';
import * as D from '../../../styles/diary/diary.style';
import * as DW from '../../../styles/diary/diarywrite.style';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';

function Emoji(props: any) {
  const [inputStr, setInputStr] = useState<string>('🙂');
  const [showPicker, setShowPicker] = useState<boolean>(false);

  useEffect(() => {
    props.getEmoji(inputStr);
  }, [inputStr, props]);

  const onEmojiClick = (emojiObject: any) => {
    setInputStr(emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <>
      <D.Emoji
        style={{ cursor: 'pointer' }}
        role='img'
        aria-label='smile'
        onClick={() => setShowPicker((val) => !val)}
      >
        {inputStr}
      </D.Emoji>
      {showPicker && (
        <DW.EmojiWrap>
          <EmojiPicker
            emojiStyle={EmojiStyle.APPLE}
            onEmojiClick={onEmojiClick}
          />
        </DW.EmojiWrap>
      )}
    </>
  );
}

export default Emoji;
