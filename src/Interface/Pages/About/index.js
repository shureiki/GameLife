import { View, ScrollView, Image, FlatList } from 'react-native'

import langManager from 'Managers/LangManager'

import { Text, Icon } from 'Interface/Components'
import { PageHeader } from 'Interface/Widgets'

import BackAbout from './back'
import styles from './style'
import themeManager from 'Managers/ThemeManager'

// @ts-ignore
const IMG_LOGO = require('Ressources/logo/GameLife_Text.png');

class About extends BackAbout {
    render() {
        const lang = langManager.curr['about'];

        console.log(this.contributors)

        return (
            <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
                <PageHeader style={styles.pageHeader} title={lang['title']} onBackPress={this.onBackPress} />

                {/** Header */}
                <View>
                    <Image style={styles.headerImage} source={IMG_LOGO} />
                    <Text style={styles.headerVersion} color='secondary' fontSize={22}>
                        {this.versionText}
                    </Text>
                </View>

                {/** Team */}
                <View>
                    <Text style={styles.title}>{lang['block-devs']}</Text>

                    <View style={styles.teamRow}>
                        <Text fontSize={18}>Pierre Marsaa</Text>
                        <Text fontSize={18} color='secondary'>
                            {lang['text-manager']}
                        </Text>
                    </View>

                    <View style={styles.teamRow}>
                        <Text fontSize={18}>Gérémy Lecaplain</Text>
                        <Text fontSize={18} color='secondary'>
                            {lang['text-developer']}
                        </Text>
                    </View>
                </View>

                {/** Links */}
                <View>
                    <Text style={styles.title}>{lang['block-links']}</Text>
                    <View style={styles.iconsRow}>
                        <Icon onPress={this.TiktokPress} icon='tiktok' />
                        <Icon onPress={this.InstaPress} icon='instagram' />
                        <Icon onPress={this.DiscordPress} icon='discord' />
                        <Icon onPress={this.GamelifePress} icon='loading' />
                    </View>
                </View>

                {/** Contributors */}
                <View style={styles.contributorsView}>
                    <Text style={styles.title}>{lang['block-contributors']}</Text>
                    <Text style={styles.contributorsText} color='secondary'>
                        {lang['text-contributors']}
                    </Text>

                    <View
                        style={{
                            display: 'flex',
                            gap: 10,
                        }}
                    >
                        {
                            // @ts-ignore
                            this.contributors.map(({ name, avatarURL }) => (
                                <View
                                    key={name}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        gap: 10,
                                        backgroundColor: themeManager.GetColor('main2'),
                                        paddingHorizontal: 8,
                                        paddingVertical: 10,
                                        borderRadius: 5
                                    }}
                                >
                                    <Image
                                        source={{ uri: avatarURL ?? 'https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg' }}
                                        style={{
                                            width: 42,
                                            height: 42,
                                            borderRadius: 20,
                                        }}
                                    />

                                    <Text
                                        style={styles.contributorsSubText}
                                        color='white'
                                        fontSize={18}
                                    >
                                        {name}
                                    </Text>  

                                </View>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default About;
