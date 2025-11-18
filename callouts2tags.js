const pattern = /> ?\[!(\w*)\](-|\+)? ?(.*)\n((>? ?(.+\n))*?)(\s*)\n/gm

hexo.extend.filter.register('before_post_render', function (data) {
    data.content = data.content.replace(pattern, (match, type, foldtype, title, content) => {
        // 处理标题
        const titlePart = title ? `${title.trim()}` : '';

        // 处理内容（移除每行开头的>和空格）
        const processedContent = content.replace(/^> ?/gm, '').trim();

        // 转换类型映射（可选）
        const typeMap = {
            note: 'primary',
            abstract: 'info',
            tip: 'success',
            success: 'success',
            question: 'warning',
            warning: 'warning',
            failure: 'danger',
            danger: 'danger',
            bug: 'danger',
            example: 'purple',
            quote: 'secondary'
        };

        const finalType = typeMap[type.toLowerCase()] || type.toLowerCase();
        if (foldtype == '+' || foldtype == '-') {
            return `{% fold ${finalType} @${type.toUpperCase()} ${titlePart} %}\n${processedContent}\n{% endfold %}\n`;
        }
        return `{% note ${finalType} %}\n**${type.toUpperCase()}** ${titlePart}   \n${processedContent}\n{% endnote %}\n`;
    });

    return data;
});
