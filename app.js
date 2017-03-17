import $ from 'jquery';
import Page from './source/Pagination';

let page = new Page();

$('#page').html(page.render(30, 20));
