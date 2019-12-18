# AdminDashboard

A admin dashboard template. Comes with 4 built-in menus and javascript to handle opening and closing of menus.

## Getting Started

To get started clone this repo to somewhere in your project.

```bash
> git clone https://github.com/pudge330/AdminDashboard.git
```

AdminSkeleton uses SASS, to customize the look and feel just override any of the settings found in `css/src/_setup.scss` and include the `main.scss` file found in the same directory.

```sass
// file: admin-skeleton.scss

// Make the header background color white
$skeleton-color-headerBackground: #fff;
// Make the menu toggles semi-transparent black
$skeleton-color-headerMenuActionFocusBackground: rgba(0, 0, 0, 0.2);

@import 'path-to-adminskeleton/css/src/main.scss';
```

Then build the final css.

```bash
> sass admin-skeleton.scss:admin-skeleton.css
```

## Setting up Your HTML


