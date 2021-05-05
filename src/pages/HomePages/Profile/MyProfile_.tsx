import { useState } from 'react';
import ProfileHeader from '../../../components/Profile/ProfileHeader';
import ProfileImageContainer from '../../../components/Profile/ProfileImage';
import ProfileInterest from '../../../components/Profile/ProfileInterestContainer';
import Layout from '../../../components/layout';

function MyProfile() {
    return (
        <Layout>
            <ProfileHeader displayName="@2donny" />
            <ProfileImageContainer />
            <ProfileInterest />
        </Layout>   
    );
}

export default MyProfile;