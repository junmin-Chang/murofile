import { Outlet, useParams } from 'react-router-dom';
import Skeleton from '../../components/common/SkeletonPlaylist';
import PlaylistButton from '../../components/profile/PlaylistButton';
import { showAddPlaylist } from '../../features/modal/modalSlice';
import { useGetUserInfoByIdQuery } from '../../services/user/userService';
import { useAppDispatch, useAppSelector } from '../../store/hook';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const { userInfo: loggedInUser } = useAppSelector((state) => state.user);
  const { isLoading, data: userInfo } = useGetUserInfoByIdQuery(
    userId as string,
    {
      skip: userId === undefined,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    },
  );

  return (
    <div className="w-full h-full flex flex-col bg-profile">
      <h2 className="text-white text-4xl font-black p-8">{userId} 님.</h2>
      {isLoading && (!loggedInUser || loggedInUser.userId !== userId) && (
        <Skeleton />
      )}
      <div className="w-full px-4 py-2 flex flex-row flex-wrap gap-2 items-center">
        {loggedInUser && loggedInUser.userId === userId
          ? loggedInUser.playlist.map((p) => (
              <PlaylistButton
                currentUserId={loggedInUser?.userId}
                playlist={p}
                key={p.id}
              />
            ))
          : userInfo?.playlist.map((p) => (
              <PlaylistButton
                currentUserId={loggedInUser?.userId}
                playlist={p}
                key={p.id}
              />
            ))}
        {!isLoading &&
          userId === loggedInUser?.userId &&
          loggedInUser.playlist.length < 5 && (
            <button
              onClick={() => {
                dispatch(showAddPlaylist());
              }}
              className="p-2 bg-green-400 text-white rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          )}
      </div>

      <Outlet />
    </div>
  );
};

export default Profile;
