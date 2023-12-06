<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favourites extends Model
{
    use HasFactory;
    protected $table = 'favourites';
    protected $primaryKey = 'id';
    public $timestamps = false;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id_user',
        'id_content'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
    public function content()
    {
        return $this->belongsTo(Content::class, 'id_content');
    }
}