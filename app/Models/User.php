<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Traits\HasPermissions;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasUuids, HasRoles, HasPermissions;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        // 'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];


    public function dealer_users()
    {
        return $this->hasMany(DealerUser::class, 'user_id', 'id');
    }

    public static function getPermissionGroups()
    {
        $permission_groups = DB::table('permissions')->select('group_name')->groupBy('group_name')->get();
        return $permission_groups;
    }

    public static function getpermissionByGroupName($group_name)
    {
        $permissions = DB::table('permissions')
            ->select('name', 'id')
            ->where('group_name', $group_name)
            ->get();
        return $permissions;
    }


    public static function roleHasPermissions($user, $permissions)
    {
        $hasPermission = true;
        foreach ($permissions as $permission) {
            if (!$user->hasPermissionTo($permission->name)) {
                $hasPermission = false;
            }
            return $hasPermission;
        }
    } // End Method

    public function canUser($permission)
    {
        // Check if the user has the given permission directly
        $userPermissions = $this->getAllPermissions()->pluck('name')->toArray();

        // Check if the user has the specified permission(s)
        return is_array($permission)
            ? count(array_intersect($permission, $userPermissions)) > 0
            : in_array($permission, $userPermissions);
        // return $this->permissions()->where('name', $permission)->exists();
    }

    public function permissions()
    {
        // Define the relationship with the user_has_permission table
        return $this->belongsToMany(Permission::class, 'user_has_permissions');
    }
}
