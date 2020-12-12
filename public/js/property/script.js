$(document).ready(function () {
    // Change active tabs based on hash value
    let current_tab = location.hash + '-panel'

    $(`.js-property-nav-tab a[href='${current_tab}']`).tab('show')

    // Catalog
    $(document).on("click", "#editCatalogButton, #deleteCatalogButton", function () {
        let _id = $(this).data('id');
        let name = $(this).data('name');
        let rate = $(this).data('rate');

        // Pass data to catalog modal
        $(".js-input-catalog-id").val(_id);
        $(".js-input-catalog-name").val(name);
        $(".js-input-catalog-rate").val(rate);
    });

    // Add-on
    $(document).on("click", "#editAddOnButton, #deleteAddOnButton", function () {
        let _id = $(this).data('id');
        let name = $(this).data('name');
        let rate = $(this).data('rate');
        let type = $(this).data('type');

        // Pass data to add-on modal
        $(".js-input-add-on-id").val(_id);
        $(".js-input-add-on-name").val(name);
        $(".js-input-add-on-rate").val(rate);
        $(".js-input-add-on-type").val(type);
    });

    // Room
    $(document).on("click", "#editRoomButton, #deleteRoomButton", function () {
        let _id = $(this).data('id');
        let name = $(this).data('name');
        let floor = $(this).data('floor');
        let catalogid = $(this).data('catalogid');
        let catalogname = $(this).data('catalogname');
        let catalograte = $(this).data('catalograte');
        let status = $(this).data('status');

        // Pass data to room modal
        $(".js-input-room-id").val(_id);
        $(".js-input-room-name").val(name);
        $(".js-input-room-floor").val(floor);
        $(".js-input-room-catalog-name").val(catalogname);
        $(".js-input-room-catalog-rate").val(catalograte);
        $(".js-input-room-status").val(status);
        $(`.js-input-room-catalog option[value=${catalogid}]`)
            .prop('selected', true)
            .text(catalogname + ' - ' + catalograte + ' (Current)')
    });

    // Tenant
    $(document).on("click", "#editTenantButton, #deleteTenantButton", function () {
        let _id = $(this).data('id');
        let first_name = $(this).data('firstname');
        let last_name = $(this).data('lastname');
        let birthday = $(this).data('birthday');
        let mobile = $(this).data('mobile');
        let email = $(this).data('email');
        let room = $(this).data('room');
        let roomname = $(this).data('roomname');

        // Pass data to tenant modal
        $(".js-input-tenant-id").val(_id);
        $(".js-input-tenant-first-name").val(first_name);
        $(".js-input-tenant-last-name").val(last_name);
        $(".js-input-tenant-birthday").val(birthday);
        $(".js-input-tenant-mobile").val(mobile);
        $(".js-input-tenant-email").val(email);
        $(".js-input-tenant-current-room").val(room);
        $(".js-input-tenant-room").val(roomname);
        $(`.js-select-tenant-room option[value=${room}]`)
            .prop({ 'disabled': false, 'selected': true })

        let selectedOption = $('.js-select-tenant-room option:selected').text()

        if (!selectedOption.includes('Current')) {
            $('.js-select-tenant-room option:selected')
                .text($(`.js-select-tenant-room option[value=${room}]`).text() + ' (Current)');
        }
    });

    // Delete 'current' on modal close
    $(document).on("hide.bs.modal", "#editTenantModal", function () {
        let room = $('.js-select-tenant-room option:selected').text();

        $(`.js-select-tenant-room .occupied`)
            .prop({ 'disabled': true });
        $('.js-select-tenant-room option:selected')
            .text(room.replace(' (Current)', ''))
            .prop({ 'selected': false });
    });
});