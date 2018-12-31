import Component from "@ember/component";
import layout from "../../templates/components/input/search-field-c1";
import { get, set } from "@ember/object";
import { later, cancel } from "@ember/runloop";
export default Component.extend({
    layout,
    classNames: ["text-field-component", "search"],
    attributeBindings: ["disabled"],
    runLater: null,
    keyUp(e) {
        const that = this;

        cancel(get(this, "runLater"));

        const timeout = later(
            that,
            () => {
                if (
                    get(that, "value").length >= get(that, "numCharacters") ||
                    (e.key === "Backspace" && get(that, "value").length === 0)
                ) {
                    if (get(that, "action")) {
                        get(that, "action")(get(that, "value"));
                    }
                }
            },
            700
        );

        set(this, "runLater", timeout);
    }
});
