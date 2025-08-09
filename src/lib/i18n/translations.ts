export const translations: Record<string, Translation> = {
  'zh-CN': {
    common: {
      loading: '加载中...',
      error: '错误',
      success: '成功',
      cancel: '取消',
      confirm: '确认',
      save: '保存',
      delete: '删除',
      edit: '编辑',
      close: '关闭',
      back: '返回',
      next: '下一步',
      previous: '上一步',
      search: '搜索',
      filter: '筛选',
      sort: '排序',
      refresh: '刷新',
      copy: '复制',
      download: '下载',
      upload: '上传',
      convert: '转换',
      settings: '设置',
      about: '关于',
      help: '帮助',
      language: '语言'
    },
    navigation: {
      home: '首页',
      convert: '转换',
      settings: '设置',
      about: '关于'
    },
    home: {
      title: '虎皮卷文件转换器',
      subtitle: '免费、快速、出色的文件转换器',
      description: '所有图像、音频和文档处理都在您的设备上完成。视频在我们的超快服务器上转换。无文件大小限制，无广告，完全开源。同时支持批量处理，一次性搞定多个文件，高效又省心。',
      uploadPlaceholder: '拖拽文件到此处或点击上传',
      supportedFormats: '支持的格式',
      images: '图像',
      audio: '音频',
      video: '视频',
      documents: '文档',
      ready: '就绪',
      loading: '加载中...',
      notSupported: '不支持',
      videoProcessingNote: '视频默认上传到服务器进行处理，了解如何本地设置',
      here: '这里',
      localSupport: '本地完全支持',
      status: '状态'
    },
    convert: {
      title: '转换文件',
      selectFile: '选择文件',
      selectFormat: '选择格式',
      converting: '转换中...',
      completed: '转换完成',
      failed: '转换失败',
      downloadAll: '下载全部',
      removeFile: '移除文件',
      addMore: '添加更多文件',
      noFiles: '没有文件',
      addFiles: '添加文件',
      convertAll: '全部转换',
      processing: '处理中...',
      unknownFile: '未知文件类型',
      audioFile: '音频文件',
      videoFile: '视频文件',
      documentFile: '文档文件',
      imageFile: '图像文件',
      cannotConvert: '我们无法转换此文件。',
      runVertdServer: '您在做什么..？您应该运行vertd服务器！',
      supportedFilesOnly: '仅支持图像、视频、音频和文档文件',
      vertdNotFound: '找不到vertd实例来启动视频转换。您确定实例URL设置正确吗？',
      convertFile: '转换此文件',
      downloadFile: '下载此文件',
      removeAllFiles: '删除所有文件',
      setAllTo: '设置全部格式为',
      notApplicable: '禁用'
    },
    settings: {
      title: '设置',
      appearance: '外观',
      privacy: '隐私',
      conversion: '转换',
      advanced: '高级设置',
      theme: {
        title: '亮度主题',
        description: '是白色主题更亮眼，还是黑色主题更酷炫？',
        light: '浅色',
        dark: '深色',
        system: '跟随系统'
      },
      effects: {
        title: '效果设置',
        description: '喜欢花哨的效果，还是更静态的体验？',
        enable: '启用',
        disable: '禁用'
      },
      filenameFormat: {
        title: '文件命名格式',
        description: '这里填的是下载文件的名字，不用带后缀。你可以用这几个模板：% name% 会换成原文件名，% extension% 是原文件后缀，% date% 则显示转换时的日期，它们都会自动替换成对应内容。'
      },
      vertd: {
        title: '视频转换',
        status: '状态',
        available: '可用',
        commitId: '提交ID',
        unavailable: '不可用（URL是否正确？）',
        description1: '<code>vertd</code>项目是FFmpeg的服务器包装器。这允许您通过VERT的Web界面的便利性转换视频，同时仍然能够利用GPU的力量尽可能快地完成转换。',
        description2: '我们为您的便利托管了一个公共实例，但如果您知道自己在做什么，在您的PC或服务器上托管自己的实例也很容易。您可以下载服务器二进制文件%link% - 设置过程在未来会变得更容易，敬请期待！',
        here: '这里',
        instanceUrl: '实例URL',
        urlPlaceholder: '示例: http://localhost:24153',
        conversionSpeed: {
          title: '转换速度',
          description: '速度越快，任务完成更快，但视频质量可能会打折扣。'
        },
        speeds: {
          verySlow: '极慢',
          slower: '较慢',
          slow: '慢',
          medium: '中等',
          fast: '快',
          ultraFast: '极快'
        }
      },
      plausible: {
        title: 'Plausible分析',
        description: '我们用的是 %plausible_link%，一款重视隐私的分析工具，只会收集完全匿名的统计数据。所有数据都是匿名汇总的，绝不会发送或存储任何可识别个人的信息。你可以点%analytics_link%查看分析数据，也能在下方选择关闭这项功能。',
        here: '这里',
        optIn: '选择加入',
        optOut: '选择退出'
      }
    },
    about: {
      title: '关于 VERT',
      description: 'VERT 是一个强大的在线文件转换工具，支持多种格式转换。',
      features: '特性',
      sponsors: '赞助商',
      donate: '捐赠',
      openSource: '开源',
      privacy: '隐私保护'
    },
    uploader: {
      dragOrClick: '拖放或点击上传'
    }
  },
  'en-US': {
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      refresh: 'Refresh',
      copy: 'Copy',
      download: 'Download',
      upload: 'Upload',
      convert: 'Convert',
      settings: 'Settings',
      about: 'About',
      help: 'Help',
      language: 'Language'
    },
    navigation: {
      home: 'Home',
      convert: 'Convert',
      settings: 'Settings',
      about: 'About'
    },
    home: {
      title: 'Tiger Roll File Converter',
      subtitle: 'Free, fast, and powerful file conversion',
      description: 'All image, audio, and document processing happens on your device. Videos are converted on our super-fast servers. No file size limits, no ads, completely open source. Batch processing is also supported, so you can process multiple files at once, efficiently and hassle-free.',
      uploadPlaceholder: 'Drag files here or click to upload',
      supportedFormats: 'Supported Formats',
      images: 'Images',
      audio: 'Audio',
      video: 'Video',
      documents: 'Documents',
      ready: 'Ready',
      loading: 'Loading...',
      notSupported: 'Not Supported',
      videoProcessingNote: 'Videos are uploaded to servers for processing by default, learn how to set up locally',
      here: 'here',
      localSupport: 'Fully supported locally',
      status: 'Status'
    },
    convert: {
      title: 'Convert Files',
      selectFile: 'Select File',
      selectFormat: 'Select Format',
      converting: 'Converting...',
      completed: 'Conversion Complete',
      failed: 'Conversion Failed',
      downloadAll: 'Download All',
      removeFile: 'Remove File',
      addMore: 'Add More Files',
      noFiles: 'No Files',
      addFiles: 'Add Files',
      convertAll: 'Convert All',
      processing: 'Processing...',
      unknownFile: 'Unknown file type',
      audioFile: 'Audio file',
      videoFile: 'Video file',
      documentFile: 'Document file',
      imageFile: 'Image file',
      cannotConvert: 'We cannot convert this file.',
      runVertdServer: 'What are you doing..? You should run the vertd server!',
      supportedFilesOnly: 'Only image, video, audio, and document files are supported',
      vertdNotFound: 'Cannot find vertd instance to start video conversion. Are you sure the instance URL is set correctly?',
      convertFile: 'Convert this file',
      downloadFile: 'Download this file',
      removeAllFiles: 'Remove all files',
      setAllTo: 'Set all to',
      notApplicable: 'Not applicable'
    },
    settings: {
      title: 'Settings',
      appearance: 'Appearance',
      privacy: 'Privacy',
      conversion: 'Conversion',
      advanced: 'Advanced Settings',
      theme: {
        title: 'Theme',
        description: 'Want sunshine bright flashes, or quiet, peaceful nights?',
        light: 'Light',
        dark: 'Dark',
        system: 'System'
      },
      effects: {
        title: 'Effects',
        description: 'Do you prefer fancy effects, or a more static experience?',
        enable: 'Enable',
        disable: 'Disable'
      },
      filenameFormat: {
        title: 'Filename Format',
        description: 'This will determine the name of the file when downloaded, excluding the file extension. You can place the following templates in the format, which will be replaced by relevant information: %name% for the original filename, %extension% for the original file extension, and %date% for the date string when the file was converted.'
      },
      vertd: {
        title: 'Video Conversion',
        status: 'Status',
        available: 'Available',
        commitId: 'commit ID',
        unavailable: 'Unavailable (Is the URL correct?)',
        description1: 'The <code>vertd</code> project is a server wrapper for FFmpeg. This allows you to convert videos through the convenience of VERT\'s web interface while still being able to leverage the power of your GPU to get conversions done as fast as possible.',
        description2: 'We host a public instance for your convenience, but if you know what you\'re doing, hosting your own instance on your PC or server is also easy. You can download the server binary %link% - the setup process will become easier in the future, stay tuned!',
        here: 'here',
        instanceUrl: 'Instance URL',
        urlPlaceholder: 'Example: http://localhost:24153',
        conversionSpeed: {
          title: 'Conversion Speed',
          description: 'This describes the trade-off between speed and quality. Faster speeds will result in lower quality but will get the job done faster.'
        },
        speeds: {
          verySlow: 'Very Slow',
          slower: 'Slower',
          slow: 'Slow',
          medium: 'Medium',
          fast: 'Fast',
          ultraFast: 'Ultra Fast'
        }
      },
      plausible: {
        title: 'Plausible Analytics',
        description: 'We use %plausible_link%, a privacy-focused analytics tool, to collect completely anonymous statistics. All data is anonymous and aggregated, identifiable information is never sent or stored. You can view the analytics %analytics_link% and opt out below.',
        here: 'here',
        optIn: 'Opt In',
        optOut: 'Opt Out'
      }
    },
    about: {
      title: 'About VERT',
      description: 'VERT is a powerful online file conversion tool that supports multiple format conversions.',
      features: 'Features',
      sponsors: 'Sponsors',
      donate: 'Donate',
      openSource: 'Open Source',
      privacy: 'Privacy Protection'
    },
    uploader: {
      dragOrClick: 'Drag or click to upload'
    }
  }
};
