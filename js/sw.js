chrome.declarativeNetRequest.getDynamicRules(rules => {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: rules.map(rule => rule.id),
        addRules: [
            {
                id: 1,
                priority: 1,
                action: {
                    type: 'redirect',
                    redirect: {
                        regexSubstitution: 'onenote:\\1'
                    }
                },
                condition: {
                    resourceTypes: ['main_frame'],
                    regexFilter: '(^https?:\/\/d\.docs\.live\.net\/.*\.one.*&section-id=.*&page-id=.*&end.*$)'
                }
            }
        ]
    })
})