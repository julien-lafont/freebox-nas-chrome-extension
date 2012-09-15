// SAMPLE
this.manifest = {
    name: "Freebox Revolution Shortcut",
    icon: "icon.png",
    settings: [
        {
            tab: i18n.get("freebox"),
            group: i18n.get("login"),
            name: "host",
            type: "text",
            label: i18n.get("host"),
            text: "http://mafreebox.freebox.fr"
        },
        {
            tab: i18n.get("freebox"),
            group: i18n.get("login"),
            name: "password",
            type: "text",
            label: i18n.get("password"),
            masked: true,
            encrypt: true
        },
        {
            tab: i18n.get("freebox"),
            group: i18n.get("login"),
            name: "security",
            type: "description",
            text: i18n.get("security")
        }
    ],
    alignment: [
        [
            "host",
            "password"
        ]
    ]
};
