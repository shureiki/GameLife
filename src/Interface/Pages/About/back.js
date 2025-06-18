import PageBase from 'Interface/FlowEngine/PageBase'
import { Linking } from 'react-native'

import user from 'Managers/UserManager'
import dataManager from 'Managers/DataManager'
import langManager from 'Managers/LangManager'

const { versionName } = require('../../../../package.json')

class BackAbout extends PageBase {
    /** @param {any} props */
    constructor(props) {
        super(props);

        // @ts-ignore
        this.contributors = [];
        this.versionText = langManager.curr['about']['text-version'].replace('{}', versionName);

        this.loadContributors();
    }

    async loadContributors() {
        const DBContributors = dataManager.contributors.contributors
           .filter(({ Name }) => Name)
           .map(({ Name }) => ({ name: Name }));

        try {
            const res = await fetch('https://api.github.com/repos/OxyFoo/GameLife/contributors');
            const data = await res.json();

            this.contributors = [
                ...DBContributors,
                // @ts-ignore
                ...data.map((contrib) => ({
                        name: contrib.login,
                        avatarURL: contrib.avatar_url,
                        profilURL: contrib.html_url
                    }))
            ]

            this.forceUpdate?.();
        } catch (error) {
            console.error('Failed to load GitHub contributors:', error);
        }
    }

    TiktokPress = () => Linking.openURL('https://www.tiktok.com/@pierre_mrsaaaaa');
    InstaPress = () => Linking.openURL('https://www.instagram.com/pierre_mrsaaaa/');
    DiscordPress = () => Linking.openURL('https://discord.com/invite/FfJRxjNAwS');
    GamelifePress = () => {
        // TODO: Manage langages for the website
        // const websiteAvailableLang = ['fr', 'en'];
        // let langKey = 'fr';
        // if (!websiteAvailableLang.includes(langManager.currentLangageKey)) {
        //     langKey = langManager.currentLangageKey;
        // }

        Linking.openURL(`https://oxyfoo.fr`);
    };

    onBackPress = () => user.interface.BackHandle();
}

export default BackAbout;
