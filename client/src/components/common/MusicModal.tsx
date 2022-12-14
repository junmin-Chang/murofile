import { ChangeEvent, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { addMusic } from '../../features/music/musicSlice';
import Select from 'react-select';
import { hideModal } from '../../features/modal/modalSlice';
const AddMusic = () => {
  const { userInfo } = useAppSelector((state) => state.user);
  const { title, image, songId, singer } = useAppSelector(
    (state) => state.music.selectedSong,
  );
  const [playlistName, setPlaylistName] = useState('');
  const [playlistId, setPlaylistId] = useState('');
  const dispatch = useAppDispatch();

  const onClose = useCallback(
    (e: ChangeEvent<any>) => {
      if (e.target.id === 'modal-container') {
        dispatch(hideModal());
      }
    },
    [dispatch],
  );
  return (
    <div
      onClick={onClose}
      id="modal-container"
      className="w-full h-full backdrop-blur-md flex items-center justify-center fixed top-0 left-0"
    >
      <div className="relative w-4/5 bg-neutral-900 rounded-md flex flex-col p-4 z-50 min-h-[200px]">
        <h2 className="text-2xl text-white font-black">음악 추가</h2>
        <div className="w-full flex flex-col py-6 gap-4">
          <Select
            options={userInfo?.playlist?.map((p) => ({
              playlistId: p.id,
              name: p.name,
              label: p.name,
            }))}
            onChange={(newValue) => {
              setPlaylistName(newValue!.name);
              setPlaylistId(newValue.playlistId);
            }}
          />
          <button
            className="p-2 rounded-md bg-green-400 text-white font-black"
            onClick={() => {
              dispatch(
                addMusic({
                  title,
                  singer,
                  image,
                  songId,
                  playlistId,
                }),
              );
              dispatch(hideModal());
            }}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMusic;
