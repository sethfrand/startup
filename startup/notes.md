# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

# Helpful Terminal Commands

| Command | Meaning |
|--------|--------|
| `echo` | Output the parameters of the command |
| `cd` | Change directory |
| `mkdir` | Make directory |
| `rmdir` | Remove directory |
| `rm` | Remove file(s) |
| `mv` | Move file(s) |
| `cp` | Copy file(s) |
| `ls` | List files |
| `curl` | Command-line client URL browser |
| `grep` | Regular expression search |
| `find` | Find files |
| `top` | View running processes with CPU and memory usage |
| `df` | View disk statistics |
| `cat` | Output the contents of a file |
| `less` | Interactively output the contents of a file |
| `wc` | Count words in a file |
| `ps` | View currently running processes |
| `kill` | Kill a currently running process |
| `sudo` | Execute a command as a super user (admin) |
| `ssh` | Create a secure shell on a remote computer |
| `scp` | Securely copy files to a remote computer |
| `history` | Show the history of commands |
| `ping` | Check if a website is up |
| `tracert` | Trace the connections to a website |
| `dig` | Show DNS information for a domain |
| `man` | Look up a command in the manual |


# Vim Keystroke Reference

| Keystroke | Meaning |
|---------|--------|
| `:h` | Help |
| `i` | Enter insert mode. Allows typing and deleting text. Press `ESC` to exit insert mode. No other commands work while in insert mode. |
| `u` | Undo |
| `CTRL-r` | Redo |
| `gg` | Go to beginning of file |
| `G` | Go to end of file |
| `/` | Search for text typed after `/` |
| `n` | Next search match |
| `N` | Previous search match |
| `v` | Visually select text |
| `y` | Yank (copy) selected text to clipboard |
| `p` | Paste clipboard |
| `CTRL-w v` | Split window vertically |
| `CTRL-w w` | Toggle windows |
| `CTRL-w q` | Close current window |
| `:e` | Open a file. Type-ahead available. Opening a directory allows navigation in the window |
| `:w` | Write file (save) |
| `:q` | Quit. Use `:q!` to exit without saving |



## AWS

My elastic IP address is: 98.82.211.73

- this is the command to ssh into the server: ssh -i [key pair file] unbuntu@[ip address]
- key file is saved in keys folder
- Go to EC2 dashboard to see the server
- domain is financesheet.click
- go to Route 53 to manage domain name and DNS records.

## Caddy


![caddy image](img.png)

[link to Caddy documentation](https://caddyserver.com/docs/caddyfile)

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

![visualize](img_1.png)

with caddy reverse proxy, domain is
https://financesheet.click/



### HTTPS, TLS, and certificates

[link to TSL documentation](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Transport_Layer_Security)
[link to Let's encrypt documentation](https://letsencrypt.org/how-it-works/)

## HTML

#### helpful links for HTML
[link to some tutorials](https://developer.mozilla.org/en-US/docs/Web/HTML)

#### Common HTML Elements
| Element        | Meaning                                                          |
|----------------|------------------------------------------------------------------|
| `html`         | The page container                                               |
| `head`         | Header information                                               |
| `title`        | Title of the page                                                |
| `meta`         | Metadata for the page such as character set or viewport settings |
| `script`       | JavaScript reference (external or inline)                        |
| `include`      | External content reference                                       |
| `body`         | The entire content body of the page                              |
| `header`       | Header of the main content                                       |
| `footer`       | Footer of the main content                                       |
| `nav`          | Navigational inputs                                              |
| `main`         | Main content of the page                                         |
| `section`      | A section of the main content                                    |
| `aside`        | Aside content from the main content                              |
| `div`          | A block division of content                                      |
| `span`         | An inline span of content                                        |
| `h<1-9>`       | Text heading, from h1 (highest) to h9 (lowest)                   |
| `p`            | A paragraph of text                                              |
| `b`            | Bring attention                                                  |
| `table`        | Table                                                            |
| `tr`           | Table row                                                        |
| `th`           | Table header                                                     |
| `td`           | Table data                                                       |
| `ol`, `ul`     | Ordered or unordered list                                        |
| `li`           | List item                                                        | 
| `a`            | Anchor text to a hyperlink                                       |
| `img`          | Graphical image reference                                        |
| `dialog`       | Interactive component such as a confirmation                     |
| `form`         | A collection of user input                                       |
| `input`        | User input field                                                 |
| `audio`        | Audio content                                                    |
| `video`        | Video content                                                    |
| `svg`          | Scalable vector graphic content                                  |
| `iframe`       | Inline frame of another HTML page                                |

Comment with <!-- and ending it with -->

[link to CodePen exercise](https://codepen.io/leesjensen/pen/GRGBqbw)
[Link to CodePen Input exercise](https://codepen.io/leesjensen/pen/dyVdNej)

#### Input Elements
| Element      | Meaning                              | Example |
|--------------|--------------------------------------|---------|
| `form`       | Input container and submission       | `<form action="form.html" method="post">` |
| `fieldset`   | Labeled input grouping               | `<fieldset> ... </fieldset>` |
| `input`      | Multiple types of user input         | `<input type="" />` |
| `select`     | Selection dropdown                   | `<select><option>1</option></select>` |
| `optgroup`   | Grouped selection dropdown           | `<optgroup><option>1</option></optgroup>` |
| `option`     | Selection option                     | `<option selected>option2</option>` |
| `textarea`   | Multiline text input                 | `<textarea></textarea>` |
| `label`      | Individual input label               | `<label for="range">Range: </label>` |
| `output`     | Output of input                      | `<output for="range">0</output>` |
| `meter`      | Display value with a known range     | `<meter min="0" max="100" value="50"></meter>` |


## CSS


### Selectors

#### combinators
| Combinator           | Meaning                        | Example        | Description                                      |
|---------------------|--------------------------------|----------------|--------------------------------------------------|
| Descendant          | A list of descendants          | body section   | Any section that is a descendant of a body       |
| Child               | A list of direct children      | section > p    | Any p that is a direct child of a section        |
| General sibling     | A list of siblings             | div ~ p        | Any p that has a div sibling                     |
| Adjacent sibling    | A list of adjacent sibling     | div + p        | Any p that has an adjacent div sibling           |


#### Declarations
| Property              | Value                             | Example                | Discussion                                                                 |
|-----------------------|-----------------------------------|------------------------|-----------------------------------------------------------------------------|
| background-color      | color                             | red                    | Fill the background color                                                   |
| border                | color width style                 | #fad solid medium      | Sets the border using shorthand where any or all of the values may be provided |
| border-radius         | unit                              | 50%                    | The size of the border radius                                               |
| box-shadow            | x-offset y-offset blur-radius color | 2px 2px 2px gray       | Creates a shadow                                                           |
| columns               | number                            | 3                      | Number of textual columns                                                  |
| column-rule           | color width style                 | solid thin black       | Sets the border used between columns using border shorthand                 |
| color                 | color                             | rgb(128, 0, 0)         | Sets the text color                                                        |
| cursor                | type                              | grab                   | Sets the cursor to display when hovering over the element                  |
| display               | type                              | none                   | Defines how to display the element and its children                        |
| filter                | filter-function                   | grayscale(30%)         | Applies a visual filter                                                    |
| float                 | direction                         | right                  | Places the element to the left or right in the flow                        |
| flex                  |                                   |                        | Flex layout. Used for responsive design                                    |
| font                  | family size style                 | Arial 1.2em bold       | Defines the text font using shorthand                                      |
| grid                  |                                   |                        | Grid layout. Used for responsive design                                    |
| height                | unit                              | .25em                  | Sets the height of the box                                                 |
| margin                | unit                              | 5px 5px 0 0            | Sets the margin spacing                                                    |
| max-[width/height]    | unit                              | 20%                    | Restricts the width or height to no more than the unit                     |
| min-[width/height]    | unit                              | 10vh                   | Restricts the width or height to no less than the unit                     |
| opacity               | number                            | .9                     | Sets how opaque the element is                                             |
| overflow              | [visible/hidden/scroll/auto]      | scroll                 | Defines what happens when the content does not fit in its box             |
| position              | [static/relative/absolute/sticky] | absolute               | Defines how the element is positioned in the document                     |
| padding               | unit                              | 1em 2em                | Sets the padding spacing                                                   |
| left                  | unit                              | 10rem                  | The horizontal value of a positioned element                               |
| text-align            | [start/end/center/justify]        | end                    | Defines how the text is aligned in the element                             |
| top                   | unit                              | 50px                   | The vertical value of a positioned element                                 |
| transform             | transform-function                | rotate(0.5turn)        | Applies a transformation to the element                                   |
| width                 | unit                              | 25vmin                 | Sets the width of the box                                                  |
| z-index               | number                            | 100                    | Controls the positioning of the element on the z axis                     |


#### Color
| Method        | Example                         | Description                                                                                                                                                |
|---------------|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| keyword       | red                             | A set of predefined colors (e.g. white, cornflowerblue, darkslateblue)                                                                                      |
| RGB hex       | #00FFAA22 or #0FA2               | Red, green, and blue as a hexadecimal number, with an optional alpha opacity                                                                                |
| RGB function  | rgb(128, 255, 128, 0.5)          | Red, green, and blue as a percentage or number between 0 and 255, with an optional alpha opacity percentage                                                  |
| HSL           | hsl(180, 30%, 90%, 0.5)          | Hue, saturation, and light, with an optional opacity percentage. Hue is the position on the 365 degree color wheel (red is 0 and 255). Saturation is how gray the color is, and light is how bright the color is. |

#### Animation
You can do a lot with CSS animations, here is an example:

[Watch Animation Example](https://codepen.io/leesjensen/pen/MWBjXNq)

[Floating Clouds Example](https://codepen.io/leesjensen/pen/wvXEaRq)


#### Responsive design
- Breakpoints:
  - The points at which a media query is introduced, and the layout changes.
#### Display
| Value  | Meaning                                                                                         |
|--------|-------------------------------------------------------------------------------------------------|
| none   | Don't display this element. The element still exists, but the browser will not render it.       |
| block  | Display this element with a width that fills its parent element. A p or div element has block display by default. |
| inline | Display this element with a width that is only as big as its content. A b or span element has inline display by default. |
| flex   | Display this element's children in a flexible orientation.                                      |
| grid   | Display this element's children in a grid orientation.                                          |


#### @Media
 - tell us which side of the screen (technically the viewport) is the longest.

This took a couple hours to get it how I wanted. It was important to make it responsive and Bootstrap helped with that. It looks great on all kinds of screen sizes.

Bootstrap seems a bit like magic. It styles things nicely, but is very opinionated. You either do, or you do not. There doesn't seem to be much in between.

I did like the navbar it made it super easy to build a responsive header.


#### CDN links for bootstrap
 - JS	https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js
 - CSS	https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css

#### Bootstrap
[Page Example](https://codepen.io/leesjensen/pen/JjZavjW)


### Feature comparison

| Feature          | Tailwind CSS                                      | Bootstrap                                                     |
|------------------|---------------------------------------------------|---------------------------------------------------------------|
| Philosophy       | Utility-first (build from primitives)             | Component-based (prebuilt UI components)                      |
| Customization    | Highly customizable via config (`tailwind.config.js`) | Customizable but more rigid without overrides                 |
| Design freedom   | Full control over spacing, color, layout          | Limited to pre-defined component styling                      |
| File size        | Smaller                                           | Larger due to bundled components and styles                   |
| Learning curve   | Steep at first as you learn native CSS            | Easy to get started                                           |
| JS dependency    | No JS (except if using plugins)                   | Depends on jQuery (Bootstrap ≤ 4) or native JS (Bootstrap 5)  |

```html

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand">
      <img src="logo.svg" width="30" height="30" class="d-inline-block align-top" alt=""/>
      Calmer
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" href="play.html">Play</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="about.html">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="src/login/login.html">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</header>
```

I also used SVG to make the icon and logo for the app. This turned out to be a piece of cake.

```html
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" fill="#0066aa" rx="10" ry="10" />
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="72" font-family="Arial" fill="white">C</text>
</svg>
```

## React Part 1: Routing

### VITE
- **`npm run dev`** bundles code to a temporary directory for the Vite debug HTTP server
- **`npm run build`** bundles your application for production deployment
- **Build process:**
  - Executes the `build` script in `package.json`
  - Invokes the Vite CLI
  - Transpiles and minifies code
  - Injects proper JavaScript
  - Outputs deployment-ready files to `dist` subdirectory

### React


Setting up Vite and React was pretty simple. I had a bit of trouble because of conflicting CSS. This isn't as straight forward as you would find with Svelte or Vue, but I made it work in the end. If there was a ton of CSS it would be a real problem. It sure was nice to have the code structured in a more usable way.

## React Part 2: Reactivity

This was a lot of fun to see it all come together. I had to keep remembering to use React state instead of just manipulating the DOM directly.

Handling the toggling of the checkboxes was particularly interesting.

```jsx
<div className="input-group sound-button-container">
  {calmSoundTypes.map((sound, index) => (
    <div key={index} className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        value={sound}
        id={sound}
        onChange={() => togglePlay(sound)}
        checked={selectedSounds.includes(sound)}
      ></input>
      <label className="form-check-label" htmlFor={sound}>
        {sound}
      </label>
    </div>
  ))}
</div>
```
