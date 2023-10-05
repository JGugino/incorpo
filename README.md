# incorpo

A simple HTML component injector which takes html components and injects them into larger html pages

## Component Layout

```
//Component header which defines the component's name
{incorpo name="example"}

//Scripts to be included and other js that should be run on this element
{#script}

{!script}

{#markup}

    <div>
        <h1>This is an example</h1>
    </div>

{!markup}

{#style}

{!style}
```
