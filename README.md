# Vue 3 + TypeScript + Vite+Epub.js

还在施工中ing


viewport

sass:	[Sass教程 Sass中文文档 | Sass中文网](https://www.sass.hk/docs/)

## epubjs 工作原理

![image-20230629122401380](README.assets/image-20230629122401380.png)

epub -(epubjs)-> Book(object):

->

1. Rendition (Theme,包括排版，样式)
2. Location （电子书定位）
3. Navigation（电子书目录）



### 问题
对于《春物.epub》轻小说，由于images未在.opf文件声明，图片未提前预加载，从而发送的请求是基于本地路径的，导致资源找不到（... ）