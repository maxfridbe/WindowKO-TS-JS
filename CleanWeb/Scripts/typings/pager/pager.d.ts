interface PagerStatic {
    extendWithPage(viewModel: any);
    start();
}
interface IPageBasic {
    id: string;
    title: string;
}

declare var pager: PagerStatic;