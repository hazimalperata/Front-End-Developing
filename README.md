
# Front-End Developing Case

### Cases:
- **CSS Case:** Creating a landing page with style according to Figma file.
- **Script Case:** Creating a quiz app with some requirements in Vanilla JS.

## CSS Case

The aim was creating pixel perfect design. Styles created with **TailwindCSS**, also there are native style elements for some actions. For better user experience, added some **Javascript** codes. For example: points on map, hovering video, counter and hamburger menu etc...

### Used Library
Used for sliders in page.
```bash
  Swiper v10.2.0
```

### File Structure
Tried to keep simple and effective 
```bash
  LandingPage
  |- assets       # contains media
     |- icons     # contains icons in page generally in svg format
     |- images    # contains images in page
     |- videos    # contains video in page
  |- pages        # html files
  |- style        # style files: input.css and output.css
  |- thirdParty   # for 3.party libraries like swiper
```

&nbsp;

## Script Case

The aim was creating a script that has acceptable efficiency and performance. All functions (expect fetching function) and variables held in **DocumentContentLoad** event function. The fetching functions held the outside this function because the fetching operation has high priority than others. Added some elements for better UX. 

### Business Choice

The answer does **NOT** save automatically when times up. When user clicked the option, needs to click button for saving the answer.

### Used Library
```bash
  Just by JS :)
```

### File Structure
Tried to keep simple and effective 
```bash
  QuizApp
  |- js       # contains js file
  |- pages    # html files
  |- style    # style files: input.css and output.css
```


