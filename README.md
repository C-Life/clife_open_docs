# 开放平台文档中心

# 文档编写

* 文档统一放在`/source`文件夹里，中文文档放在`/source/zh-cn`目录下，英文文档放在`/source/en-us`目录下\(暂不支持英文文档\)。
* 增加一个类别需要在对应目录下新建一个文件夹，并在文件夹下新建package-info文本文档，说明该文件夹中文档类别和内容，以便日后维护。
* 文档文件为.md后缀的markdown文件，文件名（及文件夹名）统一规范为英文；为了方便文档管理，中英文文档使用相同的文件夹路径及文件名
* 文档编写格式待定
* 文档编写的过程中用到的图片，放入`/images`文件夹中
* 注意：不要提交构建好的文件夹_book

# 文档目录

* 文档目录存放于`SUMMARY.md`文件中。根据现有文档类别，见文档目录结构制定如下（后期可能会调整文档目录存放位置，但结构不变）：
  * /source
    * zh-cn
      * overview   --平台概述  
      * product    --产品开发  
      * app        --app开发
        * application--应用管理
          * application.md
        * openframework--开源框架
          * open\_framework.md
        * SDK--SDK
          * index.md -- SDK首页
          * android.md
          * ios.md
          * H5.md
      * device     --硬件开发
      * cloudAPI      --云API
      * dataservice --数据服务
      * pushservice --推送服务
* 文件夹下多于1个md文件的类目，均有一个index.md文件作为该类目的目录文件
* 若有修改文件目录结构（或新增新文件夹、文件），在相应目录下建立package-info说明文档
* 添加的新文件夹或文件，需要在`SUMMARY.md`中加入相应目录



