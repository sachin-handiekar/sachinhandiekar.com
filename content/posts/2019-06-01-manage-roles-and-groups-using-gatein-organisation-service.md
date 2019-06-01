---
template: post
title: Manage Roles and Groups using Gatein Organisation Service
slug: /2014/10/manage-roles-and-groups-using-gatein-organisation-service/
draft: false
date: 2014-10-14T20:36:07.492Z
description: A tutorial showing the use of Picketlink for managing roles/permissions.
category: jBoss Portal
tags:
  - jBoss Portal
---
Managing groups and roles/permission in Gatein Picketlink using Organisation Service.

```
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

import org.apache.log4j.Logger;
import org.exoplatform.commons.utils.secure.SecureSet;
import org.exoplatform.container.ExoContainer;
import org.exoplatform.container.ExoContainerContext;
import org.exoplatform.container.PortalContainer;
import org.exoplatform.container.RootContainer;
import org.exoplatform.container.component.ComponentRequestLifecycle;
import org.exoplatform.container.component.RequestLifeCycle;
import org.exoplatform.portal.application.PortalRequestContext;
import org.exoplatform.services.organization.Group;
import org.exoplatform.services.organization.Membership;
import org.exoplatform.services.organization.MembershipType;
import org.exoplatform.services.organization.OrganizationService;
import org.exoplatform.services.organization.idm.ExtGroup;
import org.exoplatform.services.organization.User;
import org.exoplatform.services.security.Identity;
import org.exoplatform.services.security.IdentityRegistry;
import org.exoplatform.services.security.MembershipEntry;

@ManagedBean
@SessionScoped
/**
 * An utility class to manage user's roles and group assignment in exoplatform gatein container.
 * 
 * @author Sachin Handiekar
 */
public class OrganizationServiceUtil {
	private static final Logger LOGGER = Logger.getLogger(OrganizationServiceUtil.class);

	private static final String MEMBERSHIP_TYPE = "member";

	private static final String PLATFORM_PREFIX = "/platform/";

	public synchronized void refreshUserGroups(String userName) throws OrganizationServiceUtilException {

		List<String> usersGroupList = getUserGroups(userName);

		LOGGER.info("Removing currently assigned groups from platform....");
		removeUserFromAllGroups(userName);

		// Add the groups into platforms
		for (String groupName : usersGroupList) {
			LOGGER.info("Adding user into " + groupName);
			addUserToPicketLinkGroup(userName, groupName);
		}

		addUserToPicketLinkGroup(userName, "users");

	}

	/**
	 * A method which returns a list of user's group. The groups should be
	 * defined in LDAP. Please see the usage guide on Picketlink Groups in
	 * Gatein.
	 * 
	 * @param userName current logged in user's username
	 * @return a list of user groups.
	 */
	private List<String> getUserGroups(String userName) throws OrganizationServiceUtilException {

		/**
		 * A web=service can be called in this method to retrieve a list of
		 * groups which are stored in the database
		 */
		List<String> groupList = new ArrayList<String>();

		groupList.add("SampleGroup1");
		groupList.add("SampleGroup2");
		groupList.add("SampleGroup3");

		return groupList;

	}

	/**
	 * Refresh the permission of the current logged in user. The userName will
	 * be taken from the Future's Content Bean.
	 * 
	 * @param userName userName of the user whose permission's need to get
	 * refreshed.
	 * @throws OrganizationServiceUtilException if any error occurs
	 */
	public synchronized void refreshUserPermissions(String userName) throws OrganizationServiceUtilException {

		List<String> userPermissions = null;
		try {
			userPermissions = getUserPermissions(userName);

			LOGGER.info(":: userPermissions :: ");
			for (String perm : userPermissions) {
				LOGGER.info("Permission :: " + perm);

			}

			getIdentity(userName).setRoles(userPermissions);
		}
		catch (Exception ex) {
			LOGGER.error("An error occurred while getting permission for user (" + userName + ")", ex);
		}

	}

	/**
	 * A method which returns a list of permission/roles. This method can be
	 * used to call a webservice to retrieve a list of roles for a given
	 * username.
	 * 
	 * @throws ServiceRuntimeFault
	 * @throws RoleExpiredFault
	 * @throws RoleNotFoundFault
	 */
	private synchronized List<String> getUserPermissions(String userName) {

		List<String> userPerms = new ArrayList<String>();

		userPerms.add("PERMISSION_1");
		userPerms.add("PERMISSION_2");
		userPerms.add("PERMISSION_3");
		userPerms.add("PERMISSION_4");

		return userPerms;
	}

	/**
	 * Add a role/permission from the User Identity object.
	 * 
	 * @param userName userName of the user
	 * @param permissionName name of the permission.
	 */
	public synchronized void addUserPermission(String userName, String permissionName) {

		getIdentity(userName).getRoles().add(permissionName);
	}

	/**
	 * Remove a role/permission from the User Identity object.
	 * 
	 * @param userName userName of the user
	 * @param permissionName name of the permission.
	 */
	public synchronized void removeUserPermission(String userName, String permissionName) {
		getIdentity(userName).getRoles().remove(permissionName);
	}

	public void printAllGroups(String userName) {
		printSet(getIdentity(userName).getMemberships());
	}

	public void printAllPermissions(String userName) {
		LOGGER.info(":: Printing Roles/Permissions for user - " + userName);

		SecureSet<String> secureSet1 = (SecureSet<String>) getIdentity(userName).getRoles();

		Iterator<String> itr1 = secureSet1.iterator();

		while (itr1.hasNext()) {
			LOGGER.info("Role/Permission Name : " + itr1.next());
		}

	}

	private void printSet(Collection<MembershipEntry> membershipSet) {
		SecureSet<MembershipEntry> membershipEntrySet = (SecureSet<MembershipEntry>) membershipSet;

		Iterator<MembershipEntry> membershipEntryIterator = membershipEntrySet.iterator();

		while (membershipEntryIterator.hasNext()) {

			MembershipEntry membershipEntry = membershipEntryIterator.next();
			LOGGER.info("Group :: " + membershipEntry.getGroup());
			LOGGER.info("MembershipType :: " + membershipEntry.getMembershipType());

		}
	}

	public synchronized void removeUserFromPicketLinkGroup(String userName, String groupName) {
		OrganizationService orgService = (OrganizationService) getContainer().getComponentInstanceOfType(
				OrganizationService.class);
		final String groupNameVal = PLATFORM_PREFIX + groupName;

		try {
			begin(orgService);

			Membership membership = orgService.getMembershipHandler().findMembershipByUserGroupAndType(userName,
					groupNameVal, MEMBERSHIP_TYPE);

			orgService.getMembershipHandler().removeMembership(membership.getId(), true);

		}
		catch (Exception e) {
			LOGGER.error("Failed to remove user (" + userName + ") from group (" + groupNameVal + ").", e);
		}
		finally {
			end(orgService);
		}
	}

public synchronized void addUserToPicketLinkGroup(String userName, String groupName) throws Exception {
		OrganizationService orgService = (OrganizationService) getContainer().getComponentInstanceOfType(
				OrganizationService.class);

		final String groupNameVal = PLATFORM_PREFIX + groupName;

		try {
			begin(orgService);
			User user = orgService.getUserHandler().findUserByName(userName);

			MembershipType memberType = orgService.getMembershipTypeHandler().findMembershipType(MEMBERSHIP_TYPE);

			
			Group platformUserGroup = orgService.getGroupHandler().findGroupById("/platform");

			Group userGroup = orgService.getGroupHandler().findGroupById(groupNameVal);

			// If the group is not present, then create one
			if(userGroup == null) {
				Group tmpGroup = new ExtGroup();
				
				tmpGroup.setGroupName(groupName);
				tmpGroup.setLabel(groupName);

				orgService.getGroupHandler().addChild(platformUserGroup, tmpGroup, false);
				
				userGroup = orgService.getGroupHandler().findGroupById(groupNameVal);
			}
			
			orgService.getMembershipHandler().linkMembership(user, userGroup, memberType, true);

		}
		catch (Exception e) {
			log.error("Failed to add user " + userName + " to group " + groupNameVal + ".", e);
		}
		finally {
			end(orgService);
		}
	}

	@SuppressWarnings("unchecked")
	public synchronized void removeUserFromAllGroups(String userName) {
		OrganizationService orgService = (OrganizationService) getContainer().getComponentInstanceOfType(
				OrganizationService.class);
		LOGGER.info(":: removeUserFromAllGroups ::  ");
		try {
			begin(orgService);

			Collection<Membership> membershipList = orgService.getMembershipHandler().findMembershipsByUser(userName);

			LOGGER.debug("Membership List Size :  " + membershipList.size());

			for (Membership member : membershipList) {
				LOGGER.info("Id : " + member.getId());
				LOGGER.info("GroupId : " + member.getGroupId());
				LOGGER.info("Membership Type : " + member.getMembershipType());
				LOGGER.info("GroupId : " + member.getUserName());

			}

			orgService.getMembershipHandler().removeMembershipByUser(userName, true);

		}
		catch (Exception e) {
			LOGGER.error("Failed to remove groups for user " + userName + ".", e);
		}
		finally {
			end(orgService);
		}

	}

	/**
	 * Begin the lifecycle of Organization Service.
	 * 
	 * @param orgService organization service
	 */
	private void begin(OrganizationService orgService) {
		if (orgService instanceof ComponentRequestLifecycle) {
			RequestLifeCycle.begin((ComponentRequestLifecycle) orgService);
		}
	}

	/**
	 * End the lifecycle of Organization Service.
	 * 
	 * @param orgService organization service
	 */
	private void end(OrganizationService orgService) {
		if (orgService instanceof ComponentRequestLifecycle) {
			RequestLifeCycle.end();
		}
	}

	/**
	 * @return Gives the {@link ExoContainer} that fits best with the current
	 * context
	 */
	private ExoContainer getContainer() {
		ExoContainer container = ExoContainerContext.getCurrentContainer();
		if (container instanceof RootContainer) {
			// The top container is a RootContainer, thus we assume that we are
			// in a portal mode
			PortalRequestContext portalRequestContext = PortalRequestContext.getCurrentInstance();

			container = PortalContainer.getCurrentInstance(portalRequestContext.getRequest().getSession()
					.getServletContext());

			if (container == null) {
				container = ExoContainerContext.getTopContainer();
			}
		}
		// The container is a PortalContainer or a StandaloneContainer
		return container;
	}

	private Identity getIdentity(String userName) {
		IdentityRegistry identityRegistry = (IdentityRegistry) PortalContainer.getInstance()
				.getComponentInstanceOfType(IdentityRegistry.class);
		return identityRegistry.getIdentity(userName);
	}

}
view rawOrganizationServiceUtil.java hosted with ❤ by GitHub
public class OrganizationServiceUtilException extends Exception {

	private static final long serialVersionUID = 1L;

	public OrganizationServiceUtilException() {
		super();
	}

	public OrganizationServiceUtilException(String message) {
		super(message);
	}

	public OrganizationServiceUtilException(Throwable cause) {
		super(cause);
	}

	public OrganizationServiceUtilException(String message, Throwable cause) {
		super(message, cause);
	}
}
```
