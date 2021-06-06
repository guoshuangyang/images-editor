# images-editor
npm  images-editor
### Install

```shell
npm i images-editor -S
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/images-editor"></script>
```

### Use

```html
<div id="id1" style="width: 184px;height: 60px"></div>
<script>
       let imageEditor = new ImagesEditor('id1', { image: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" })
</script>
```

```html
<div id="id2" style="width: 184px;height: 60px"></div>
<img id="image" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"></img>
<script>
	// Please take the loaded image as a parameter
	var image = document.getElementById('image')
	image.onload = function () {
		var imageEditor = new ImagesEditor('id2', { image: image })
	}
</script>
```

