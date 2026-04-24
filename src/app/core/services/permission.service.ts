import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Permission, UserGroup } from '../models/permission.model';
import { MOCK_PERMISSIONS, MOCK_USER_GROUPS } from '../../../constants/mock-data';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private permissions = MOCK_PERMISSIONS;
  private userGroups = MOCK_USER_GROUPS;

  constructor() {}

  getPermissions(): Observable<Permission[]> {
    return of([...this.permissions]).pipe(delay(200));
  }

  getUserGroups(): Observable<UserGroup[]> {
    return of([...this.userGroups]).pipe(delay(200));
  }

  getUserGroupById(id: string): Observable<UserGroup | undefined> {
    return of(this.userGroups.find((g: UserGroup) => g.id === id)).pipe(delay(150));
  }

  getUserGroupsByUser(usuarioId: string): Observable<UserGroup[]> {
    const resultado = this.userGroups.filter((g: UserGroup) =>
      g.usuarios.includes(usuarioId)
    );
    return of(resultado).pipe(delay(150));
  }

  checkPermission(usuarioId: string, recurso: string, acao: string): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        const userGroups = this.userGroups.filter((g: UserGroup) =>
          g.usuarios.includes(usuarioId)
        );

        const temPermissao = userGroups.some((group: UserGroup) =>
          group.permissoes.some((permId: string) => {
            const perm = this.permissions.find((p: Permission) => p.id === permId);
            return perm && perm.recurso === recurso && perm.acao === acao;
          })
        );

        observer.next(temPermissao);
        observer.complete();
      }, 100);
    });
  }

  addUserToGroup(usuarioId: string, grupoId: string): Observable<UserGroup | null> {
    const grupo = this.userGroups.find((g: UserGroup) => g.id === grupoId);
    if (grupo && !grupo.usuarios.includes(usuarioId)) {
      grupo.usuarios.push(usuarioId);
    }
    return of(grupo || null).pipe(delay(200));
  }

  removeUserFromGroup(usuarioId: string, grupoId: string): Observable<void> {
    const grupo = this.userGroups.find((g: UserGroup) => g.id === grupoId);
    if (grupo) {
      grupo.usuarios = grupo.usuarios.filter((u: string) => u !== usuarioId);
    }
    return of(void 0).pipe(delay(200));
  }

  assignPermissionToGroup(grupoId: string, permissaoId: string): Observable<UserGroup | null> {
    const grupo = this.userGroups.find((g: UserGroup) => g.id === grupoId);
    if (grupo && !grupo.permissoes.includes(permissaoId)) {
      grupo.permissoes.push(permissaoId);
    }
    return of(grupo || null).pipe(delay(200));
  }

  removePermissionFromGroup(grupoId: string, permissaoId: string): Observable<UserGroup | null> {
    const grupo = this.userGroups.find((g: UserGroup) => g.id === grupoId);
    if (grupo) {
      grupo.permissoes = grupo.permissoes.filter((p: string) => p !== permissaoId);
    }
    return of(grupo || null).pipe(delay(200));
  }
}
