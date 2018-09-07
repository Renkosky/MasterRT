import { MrResource as _mr } from 'masterrt';

class $pool {
    login: any = _mr.pool('/services/login/wukong');

    wechat: any = _mr.pool('/services/login/weChatLink');
    codeLogin: any = _mr.pool('/services/login/code');
    tenant: any = _mr.pool('/services/tenant{/:tenantId}');
    user: any = _mr.pool('/services/user');
    content: any = _mr.pool('/services/social3/content');
    stat: any = _mr.pool('/services/social3/stat');
    cloud: any = _mr.pool('/services/social3/cloud');
    compare: any = _mr.pool('/services/themes3/compare');
    themesStat: any = _mr.pool('/services/themes3/stat');
    themesCloud: any = _mr.pool('/services/themes3/cloud');
    themesContent: any = _mr.pool('/services/themes3/content');
    themes3: any = _mr.pool('/services/themes3');
    theme3byid: any = _mr.pool('/services/themes3{/:id}');
    themeGroup3: any = _mr.pool('/services/themeGroup3{/:id}');
    // themeGroup3byid: any = _mr.pool('/services/themeGroup3{/:id}');

    accountList: any = _mr.pool('/services/accounts');
    accountTrend: any = _mr.pool('/services/accounts/weibo/user');
    fansAnalyzer: any = _mr.pool('/services/accounts/weibo/followers/stats');
    accountsPosts: any = _mr.pool('/services/accounts/contents/query');
    postContentTrend: any = _mr.pool('/services/accounts/contents/stats');

    addAccount: any = _mr.pool('/services/accounts/save');
    addWechatAccount: any = _mr.pool('/services/accounts/saveWechat');
    ctrlAccount: any = _mr.pool('/services/accounts{/:id}'); // 根据ID查询的用get请求即可 删除用delete
    postCloud: any = _mr.pool('/services/social3/cloud');

    compareAdd: any = _mr.pool('/services/accountComparator/save');
    compareOperation: any = _mr.pool('/services/accountComparator{/:id}'); // 修改和删除
    compareList: any = _mr.pool('/services/accountComparator');
    compareInfo: any = _mr.pool('/services/accountComparator/accountFanPerformance');

    compareRank: any = _mr.pool('/services/accountComparator/accountRankByTime');
    compareTrend: any = _mr.pool('/services/accountComparator/accountTrendByTime');

    getAuthUrl: any = _mr.pool('/services/accounts/oauth');
    searchHistory: any = _mr.pool('/services/social3/searchLogByUser');
    delSearchHistory: any = _mr.pool('/services/social3/deleteSearchLog');
    delAllSearch: any = _mr.pool('/services/social3/deleteAllSearchLog');
    downloadPosts: any = _mr.pool('/services/social3/download');
    maxKeyNum: any = _mr.pool('/services/social3/validMaxKeyWordNum'); // keywords
    userInfo: any = _mr.pool('/services/social3/userInformation'); // get
    searchBytody: any = _mr.pool('/services/social3/searchLogByToday'); // post

    wechatArticle: any = _mr.pool('/services/accounts/wechat/user-statistics');
    wechatUserArticle: any = _mr.pool('/services/accounts/wechatUser/graphicAnalysis');
    wechatArticNum: any = _mr.pool('/services/accounts/wechat/articles-num');
    wechatCloud: any = _mr.pool('/services/accounts/wechat/cloud');
    wechatPosts: any = _mr.pool('/services/accounts/wechat/query');
    wechatFansSource: any = _mr.pool('/services/accounts/wechat/source-proportion');
    wechatFansNum: any = _mr.pool('/services/accounts/wechat/fan-num-analysis');
    wechatFansDis: any = _mr.pool('/services/accounts/wechat/fan-distribution');
    wechatAccountTrend: any = _mr.pool('/services/accounts/wechat/sequential');
    wechatUserTrend: any = _mr.pool('/services/accounts/wechatUser/sequential');

    wechatComInfo: any = _mr.pool('/services/accountComparator/accountWechatList');
    wechatUserInfo: any = _mr.pool('/services/accountComparator/accountWechatUserList');

    wechatComFanTrend: any = _mr.pool('/services/accountComparator/wechatFanTrend');
    wechatComFanRank: any = _mr.pool('/services/accountComparator/wechatFanTrendRank');

    wechatComReadTrend: any = _mr.pool('/services/accountComparator/wechatReadTrend');
    wechatComReadRank: any = _mr.pool('/services/accountComparator/wechatReadTrendRank');

    wechatComArticlesTrend: any = _mr.pool('/services/accountComparator/wechatPublishedArticlesTrend');
    wechatComArticlesRank: any = _mr.pool('/services/accountComparator/wechatPublishedArticlesTrendRank');

    wechatComUserRank: any = _mr.pool('/services/accountComparator/accountWechatUserRank');
    wechatComUserTrend: any = _mr.pool('/services/accountComparator/accountWechatUserTreand');

    trigger: any = _mr.pool('/services/trigger');
    delEditTrigger: any = _mr.pool('/services/trigger{/:id}');
    emailList: any = _mr.pool('/services/trigger/emailsByTenant');
    triggerLog: any = _mr.pool('/services/trigger/triggerLogs');

    getStandardProgram: any = _mr.pool('/services/standard/program');
    getStandardBrand: any = _mr.pool('/services/standard/brand');

    amendEmotion: any = _mr.pool('/services/social3/amendEmotion');

    /**
     * one loreal
     */

    knowledgeCenterMenu: any = _mr.pool('/services/select-templates/loreal.knowledge_center.menu.list/');
    knowledgeDateRange: any = _mr.pool('/services/select-templates/loreal.knowledge_center.query_condition/');
    knowledgeCenterList: any = _mr.pool('/services/select-templates/loreal.knowledge_center.file.list/');
    knowledgeCenterUpload: any = _mr.pool('/oneLoreal/file/upload');

    /**
     * csi-mobile
     */
    oauthVerfiy: any = _mr.pool('/services/loreal/oauth');

    /**
     * csi 系列
     */
    csiTemplates: any = _mr.pool('/services/select-templates{/:apiName}/');
    csiEndorsement: any = _mr.pool('/services/select-multi-template?endorsement');
    csiWCloud: any = _mr.pool('/services/csiwc');
    csiWeibo: any = _mr.pool('/services/csicontent/custom');
    csiFans: any = _mr.pool('/services/csi/queryFollowerCoin');

    /**
     * ksi 系列
     */
    ksiWCloud: any = _mr.pool('/services/ksiwc');
    ksiWeibo: any = _mr.pool('/services/ksicontent/custom');
    ksiFans: any = _mr.pool('/services/ksi/queryFollowerCoin');
    /**
     * cii
     */

    ciiList: any = _mr.pool('/services/select-templates/cii_basedata_select/');

    ciiSearchList: any = _mr.pool('/services/select-templates/cii_select_ingredient/');
    ciiTop10: any = _mr.pool('/services/select-templates/cii_basedata_top10/');
    ciiFilters: any = _mr.pool('/services/select-templates/cii_data_information/');
    ciiBrandEChart: any = _mr.pool('/services/select-templates/cii_details_brand/');
    ciiIngredientEChart: any = _mr.pool('/services/select-templates/cii_details_benefit/');
    ciiFrequencyEChart: any = _mr.pool('/services/select-templates/cii_details_childingredient/');
    ciiCategoryEChart: any = _mr.pool('/services/select-templates/cii_details_category/');

    ciiDetail: any = _mr.pool('/services/select-templates/cii_title_ingredient/');

    ciiTrendEChart: any = _mr.pool('/services/select-templates/cii_trend_ciiindex/');
    ciiSearchEChart: any = _mr.pool('/services/select-templates/cii_trend_searchindex/');
    ciiSocialIndexEChart: any = _mr.pool('/services/select-templates/cii_trend_socialindex/');
    ciiSocialSecondEChart: any = _mr.pool('/services/select-templates/cii_trend_social_second_index/');
    ciiSocialLevelEChart: any = _mr.pool('/services/select-templates/cii_now_social_second_index/');

    /**
     * screen 大屏
     */
    // screen_users:any = _mr.pool('../components/screen-index/store/users.json');
    // screen_keywords:any = _mr.pool('/retail/export/loreal/hotwords/hotwords.json');
    // screen_performance:any = _mr.pool('/retail/export/loreal/catperf/catperf2.json');
    // screen_tweets:any = _mr.pool('/retail/export/loreal/hotwords/hotwords_:word.json');
    // screen_sample:any = _mr.pool('/retail/export/loreal/hotWordSample/:brandId/:word');
    // screen_lancome_tweets:any = _mr.pool('/lancome/screen/data/hotwords/hotwords_:word.json');
    // screen_lancome_sample:any = _mr.pool('/lancome/screen/hotWordSample/168/:brandId/:word');
    // screen_lancome_performance:any = _mr.pool('/lancome/screen/data/catperf/catperf2.json');
    // screen_lancome_keywords:any = _mr.pool('/lancome/screen/data/hotwords/hotwords.json');

    screen_friso_trend: any = _mr.pool('../components/screen-index/store/friso/friso_trend.json');
    screen_friso_words: any = _mr.pool('../components/screen-index/store/friso/friso_wordcloud.json');
    /**
     * Screen
     */

    performance: any = _mr.pool('/{:brand}/screen/data/catperf/catperf2.json');
    screen_cloud: any = _mr.pool('/{:brand}/screen/data/hotwords/hotwords.json');
    screen_post: any = _mr.pool('/{:brand}/screen/hotWordSample{/:tenant}{/:brandId}{/:word}');

    // DBPI系列
    getOverviewList: any = _mr.pool('/services/select-handle/');
    getBrandSelectList: any = _mr.pool('/services/select/');
    getOverviewDownload: any = _mr.pool('/services/select-handle/');
    getDbpiServices: any = _mr.pool('/services{/:apiName:/}');

    //TRIBE系列
    getBrandsList: any = _mr.pool('/services/select-templates/tribe.dict.brand/');
    getTopics: any = _mr.pool('/services/select-templates/tribe.dict.topic/');
    getTribes: any = _mr.pool('/services/select-templates/tribe.dict.tribe/');
    getTimers: any = _mr.pool('/services/select-templates/tribe.update_time/');
    getTopicTableList: any = _mr.pool('/services/select-templates/tribe.topic.topic/');
    getTopicTableListD: any = _mr.pool('/services/select-templates/tribe.topic.topic/?downloadName=Topic%20Index.xlsx');
    getTopicsList: any = _mr.pool('/services/select-templates/tribe.dict.topic/');
    getBmOverview: any = _mr.pool('/services/select-templates/tribe.topic.brand/');
    getBmOverviewD: any = _mr.pool('/services/select-templates/tribe.topic.brand/?downloadName=L%E2%80%99Oreal%20Benchmark%20Index.xlsx');
    getTopicHotwords: any = _mr.pool('/services/select-templates/tribe.topic.hotword/');
    getTopicHotwordsD: any = _mr.pool('/services/select-templates/tribe.topic.hotword/?downloadName=Topic%20Hot%20Word.xlsx');
    getPosts: any = _mr.pool('/services/social/tribe/posts/');
    getPostsD: any = _mr.pool('/services/social/tribe/posts/?downloadName=Tribe%20Head%20Raw%20Posts.xlsx');
    getTribeOverview: any = _mr.pool('/services/select-templates/tribe.topic.tribe/');
    getTribeOverviewD: any = _mr.pool('/services/select-templates/tribe.topic.tribe/?downloadName=Digital%20Tribe%20Overview.xlsx');
    getTribeHotwords: any = _mr.pool('/services/social/tribe/wordcloud/');
    getTribeHotwordsD: any = _mr.pool('/services/social/tribe/wordcloud/?downloadName=Tribe%20Head%20Hot%20Word.xlsx');
    getTribeHead: any = _mr.pool('/services/select-templates/tribe.tribe.influencer_kol/');
    getTribeHeadD: any = _mr.pool('/services/select-templates/tribe.tribe.influencer_kol/?downloadName=Tribe%20Head.xlsx');

    /**
     * mock
     */
    getProUsers: any = _mr.pool('/pro/users{/:id}');

    /**
     * sei-standard
     */
    getSeiStdSponsor: any = _mr.pool('/services/seipost/sponsor');
    getSeiStandard: any = _mr.pool('/services/seipost{/:name}');
}

export default new $pool();
