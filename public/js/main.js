$(document).ready(function(){

  $('.delete-blog').on('click', function(){
    var id = $(this).data('id');
    var section = $(this).data('section');
    var url = '/delete/'+id;
    if(confirm("Delete Blog ?")){
      $.ajax({
        url: url,
        type:'DELETE',
        success: function(result){
          console.log('Deleting post...');
          window.location.href='/';
        },
        error: function(err){
          console.log(err);
        }
      });
    }
  });
  $('.edit-blog').on('click',function(){
    $('#edit-form-name').val($(this).data('name'));
    $('#edit-form-topic').val($(this).data('topic'));
    $('#edit-form-article').val($(this).data('article'));
    $('#edit-form-comment').val($(this).data('comment'));
    $('#edit-form-id').val($(this).data('id'));

  });

  $('.add-comment').on('click',function(){
    $('#add-form-comment').val($(this).data('comment'));
    $('#add-form-id').val($(this).data('id'));
  });
});
