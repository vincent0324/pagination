import juicer from 'juicer';

let tpl = [
    '{@if maxShowPage>1}',

    '<div class="dd-global-pagination">',

    '{@if pageCurrent>1}',
    '<a href="javascript:;" class="page-item j-page page-prev" data-page="${+pageCurrent-1}"><</a>',
    '{@/if}',

    '{@each pages as item,index}',

    '{@if item.type=="link"}',
    '<a href="javascript:;" class="page-item j-page" data-page="${item.value}">${item.value}</a>',
    '{@else if item.type=="plain"}',
    '<span class="page-current">${item.value}</span>',
    '{@else}',
    '<span class="page-ellipsis">...</span>',
    '{@/if}',
    '{@/each}',

    '{@if pageCurrent < maxShowPage}',
    '<a href="javascript:;" class="page-item j-page page-next" data-page="${+pageCurrent+1}">></a>',
    '{@/if}',

    '</div>',

    '{@/if}'
];
let pages = [];
let SHOW_MAX = 9;
let SHOW_MIN = 3;

class Pagination {

    constructor() {
        //
    }

    generate(pageCurrent) {

        if (this.pageMax < SHOW_MAX) {

            for (var i = 1; i <= this.pageMax; i++) {
                pages.push({
                    value: i,
                    type: i === (+pageCurrent)
                        ? 'plain'
                        : 'link'
                });
            }
        } else {

            if ((+pageCurrent) - 1 - 1 <= SHOW_MIN) {

                for (var j = 1; j <= SHOW_MAX - 1; j++) {
                    pages.push({
                        value: j,
                        type: j === (+pageCurrent)
                            ? 'plain'
                            : 'link'
                    });
                }

                pages.push({value: 0, type: 'ellipsis'});
            } else if (this.pageMax - (+pageCurrent) - 1 <= SHOW_MIN) {
                pages.push({value: 1, type: 'link'});
                pages.push({value: 0, type: 'ellipsis'});

                for (var k = this.pageMax - SHOW_MAX + 2; k <= this.pageMax; k++) {
                    pages.push({
                        value: k,
                        type: k === (+pageCurrent)
                            ? 'plain'
                            : 'link'
                    });
                }
            } else {
                pages.push({value: 1, type: 'link'});
                pages.push({value: 0, type: 'ellipsis'});

                for (var ii = (+pageCurrent) - SHOW_MIN; ii <= (+pageCurrent) + SHOW_MIN; ii++) {
                    pages.push({
                        value: ii,
                        type: ii === (+pageCurrent)
                            ? 'plain'
                            : 'link'
                    })
                }

                pages.push({value: 0, type: 'ellipsis'})
            }
        }
    }

    render(pageMax, pageCurrent, maxShowPage) {
        var context = this;
        var maxShowPage = maxShowPage || pageMax;
        var pageHtml = '';

        this.pageMax = pageMax;
        this.generate(pageCurrent);
        pageHtml = juicer(tpl.join(''), {
            pageCurrent: pageCurrent,
            pageMax: context.pageMax,
            pages: pages,
            maxShowPage: maxShowPage
        });
        pages = [];

        return pageHtml;
    }
};

export default Pagination;
