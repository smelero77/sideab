<svelte:head>
  <title>Mi Perfil - Side A / Side B</title>
</svelte:head>

<script lang="ts">
  import Modal from '$lib/components/ui/Modal.svelte';
  import { toastInfo, toastSuccess } from '$lib/stores/notificationStore';
  import IconPencilSquare from '$lib/components/icons/IconPencilSquare.svelte';
  import IconShieldCheck from '$lib/components/icons/IconShieldCheck.svelte';
  import IconDocumentText from '$lib/components/icons/IconDocumentText.svelte';
  import IconLogout from '$lib/components/icons/IconLogout.svelte';

  // --- Modales ---
  let showChangePasswordModal = false;
  let showPrivacyPolicyModal = false;
  let showDeleteAccountModal = false;

  // --- Datos Simulados del Perfil ---
  let userProfile = {
    name: 'Usuario Demo',
    email: 'usuario.demo@example.com',
    avatarUrl: 'https://source.unsplash.com/random/100x100/?avatar,face',
    joinDate: 'Enero 15, 2024',
  };
  let newPassword = '';
  let confirmNewPassword = '';

  function handleChangePassword() {
    if (newPassword && newPassword === confirmNewPassword) {
      showChangePasswordModal = false;
      toastSuccess('Contraseña cambiada (simulación).');
      newPassword = '';
      confirmNewPassword = '';
    } else {
      toastInfo('Las contraseñas no coinciden o están vacías.');
    }
  }

  function confirmAccountDeletion() {
    showDeleteAccountModal = false;
    toastInfo('Cuenta eliminada (simulación).');
  }

  interface ProfileSection {
    title: string;
    items: ProfileItem[];
  }
  interface ProfileItem {
    id: string;
    label: string;
    icon: any;
    action?: () => void;
    href?: string;
    isDestructive?: boolean;
  }

  const profileSections: ProfileSection[] = [
    {
      title: 'Cuenta',
      items: [
        { id: 'editName', label: 'Editar Nombre', icon: IconPencilSquare, action: () => toastInfo('Función "Editar Nombre" no implementada.') },
        { id: 'changePass', label: 'Cambiar Contraseña', icon: IconShieldCheck, action: () => showChangePasswordModal = true },
      ],
    },
    {
      title: 'Legal',
      items: [
        { id: 'privacy', label: 'Política de Privacidad', icon: IconDocumentText, action: () => showPrivacyPolicyModal = true },
        { id: 'terms', label: 'Términos de Servicio', icon: IconDocumentText, action: () => toastInfo('Función "Términos" no implementada.') },
      ],
    },
    {
      title: '',
      items: [
        { id: 'deleteAccount', label: 'Eliminar Cuenta', icon: IconLogout, action: () => showDeleteAccountModal = true, isDestructive: true },
      ]
    }
  ];
</script>

<div class="container mx-auto py-6 px-2 md:px-4">
  <header class="mb-8 text-center">
    <img
      src={userProfile.avatarUrl}
      alt="Avatar de {userProfile.name}"
      class="w-24 h-24 rounded-full mx-auto mb-3 border-2 border-accent shadow-lg"
    />
    <h1 class="text-2xl font-bold text-text-primary">{userProfile.name}</h1>
    <p class="text-sm text-text-secondary">{userProfile.email}</p>
    <p class="text-xs text-text-disabled mt-1">Miembro desde: {userProfile.joinDate}</p>
  </header>

  <div class="space-y-6">
    {#each profileSections as section}
      <div>
        {#if section.title}
          <h2 class="text-xs font-semibold uppercase text-text-disabled mb-2 px-2 tracking-wider">{section.title}</h2>
        {/if}
        <ul class="bg-bg-secondary rounded-lg shadow-md overflow-hidden">
          {#each section.items as item, i (item.id)}
            <li>
              <button
                type="button"
                on:click={item.action}
                class="w-full flex items-center px-4 py-3.5 text-left hover:bg-bg-tertiary focus:bg-bg-tertiary focus:outline-none transition-colors duration-150
                      {item.isDestructive ? 'text-error-text hover:text-error-text' : 'text-text-primary'}"
              >
                <svelte:component this={item.icon} extraClass="w-5 h-5 mr-4 {item.isDestructive ? 'text-error-text' : 'text-accent'}" />
                <span class="flex-1">{item.label}</span>
                {#if !item.isDestructive}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-text-disabled">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                {/if}
              </button>
              {#if i < section.items.length - 1}
                <hr class="border-bg-tertiary ml-16" />
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</div>

<Modal
  bind:open={showChangePasswordModal}
  title="Cambiar Contraseña"
  on:close={() => {showChangePasswordModal = false; newPassword=''; confirmNewPassword='';}}
  on:confirm={handleChangePassword}
  confirmText="Guardar Cambios"
>
  <form on:submit|preventDefault={handleChangePassword} class="space-y-4">
    <div>
      <label for="newPassword" class="block text-sm font-medium text-text-secondary mb-1">Nueva Contraseña</label>
      <input type="password" id="newPassword" name="newPassword" bind:value={newPassword}
             class="w-full p-2 rounded-md bg-bg-primary border border-bg-tertiary text-text-primary focus:ring-2 focus:ring-accent focus:border-accent" required />
    </div>
    <div>
      <label for="confirmNewPassword" class="block text-sm font-medium text-text-secondary mb-1">Confirmar Nueva Contraseña</label>
      <input type="password" id="confirmNewPassword" name="confirmNewPassword" bind:value={confirmNewPassword}
             class="w-full p-2 rounded-md bg-bg-primary border border-bg-tertiary text-text-primary focus:ring-2 focus:ring-accent focus:border-accent" required />
    </div>
  </form>
</Modal>

<Modal
  bind:open={showPrivacyPolicyModal}
  title="Política de Privacidad"
  on:close={() => (showPrivacyPolicyModal = false)}
  showConfirmButton={false}
  cancelText="Cerrar"
>
  <div class="prose prose-sm prose-invert max-w-none text-text-secondary space-y-3">
    <p>Última actualización: 03 de Junio, 2025.</p>
    <p>Bienvenido a Side A / Side B. Nos tomamos tu privacidad muy en serio...</p>
    <h4 class="text-text-primary">Información que Recopilamos</h4>
    <p>Cuando juegas, recopilamos datos anónimos sobre tu progreso para mejorar el juego...</p>
    <h4 class="text-text-primary">Cómo Usamos tu Información</h4>
    <p>La información se usa para personalizar tu experiencia y para análisis internos...</p>
    <p><em>(Este es un texto de ejemplo. Deberías incluir tu política de privacidad real aquí.)</em></p>
  </div>
</Modal>

<Modal
  bind:open={showDeleteAccountModal}
  title="¿Eliminar cuenta? 🗑️"
  on:close={() => (showDeleteAccountModal = false)}
  on:confirm={confirmAccountDeletion}
  confirmText="Sí, eliminar"
  cancelText="No, cancelar"
>
  <p class="text-text-secondary">
    Esta acción es irreversible. ¿Estás seguro de que deseas eliminar tu cuenta y todos tus datos?
  </p>
</Modal> 