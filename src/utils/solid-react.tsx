// reusable wrapper to inject React inside Solid
import { createEffect, untrack } from "solid-js";
import { render } from "react-dom";
import { createElement } from "react";

export default function (Component) {
    return (props) => {
        let el;
        createEffect(() => {
            Object.values(props);
            untrack(() => render(createElement(Component, props), el));
        });
        return <div ref={el} />;
    };
}
