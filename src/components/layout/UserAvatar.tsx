import React from 'react';
import { User } from '@supabase/supabase-js';
import { User as UserIcon } from 'lucide-react';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const avatarUrl = user.user_metadata?.avatar_url || 
                   user.user_metadata?.picture || 
                   user.user_metadata?.profile_photo;

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-cyber-blue/10 flex items-center justify-center`}>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={user.email || 'User avatar'}
          className="w-full h-full object-cover"
        />
      ) : (
        <UserIcon className="w-5 h-5 text-cyber-blue" />
      )}
    </div>
  );
};

export default UserAvatar;