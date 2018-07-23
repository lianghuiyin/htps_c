import Ember from 'ember';

const { alias } = Ember.computed;

export default Ember.Component.extend({
    tagName: 'button',
    attributeBindings: [
        'data-clipboard-action', 'data-clipboard-target', 'data-clipboard-text'
    ],

    action: 'copy',
    target: null,
    text: null,

    'data-clipboard-action': alias('action'),
    'data-clipboard-target': alias('target'),
    'data-clipboard-text': alias('text'),

    didInsertElement() {
        this.initializeClipboard();
    },

    initializeClipboard() {
        const clipboard = new window.ClipboardJS(`#${this.elementId}`);

        clipboard.on('success', event => {
            this.sendAction('onSuccess', event);
        });

        clipboard.on('error', event => {
            this.sendAction('onError', event);
        });
    },
    eventManager: Ember.Object.create({
        click(event, view) {
            let text = view.get("text");
            if(window.clipboardData && text){
                window.clipboardData.setData("Text", text); 
            }
        }
    })
});
