import * as React from 'react';
import type { InterestInfo } from '../../store/modules/articles';

export interface ProfileInterestCardProps {
    title: string;
    interestArr: InterestInfo[];
    onClick: () => void;
}

function ProfileInterestCard({
    title,
    interestArr,
    onClick
}: ProfileInterestCardProps) {
    return (
        <div>
            
        </div>
    );
}

export default ProfileInterestCard;